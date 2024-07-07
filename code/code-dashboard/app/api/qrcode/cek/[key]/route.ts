// File: app/api/qrcode/cek/[key]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils';
import { Prisma } from '@prisma/client';

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    // Extract the key from the URL parameters
    const key: string = params.key;

    // Validate key
    if (!key) {
      return NextResponse.json({ message: 'Key is required' }, { status: 400 });
    }

    // Find the QR code in the database
    const result = await prisma.qrCode.findFirst({
      where: { key: key }
    });

    if (result) {
      return NextResponse.json({ message: 'QRCode Valid' }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: 'QRCode Tidak Valid' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.error('Unique constraint violation:', error);
      }

      return NextResponse.json(
        {
          message: 'QRCode Tidak Valid',
          error: 'Unique constraint violation'
        },
        { status: 404 }
      );
    }

    // General error handling
    console.error('Error checking QRCode:', error);
    return NextResponse.json(
      { message: 'Error checking QRCode', error: error.message },
      { status: 500 }
    );
  }
}
