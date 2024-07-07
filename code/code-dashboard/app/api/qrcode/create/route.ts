// File: app/api/user/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance
import { z } from 'zod';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Ensure we're dealing with a POST request
    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Define schema using zod
    const qrcodeFormSchema = z.object({
      id_kegiatan: z.number().int().nullable()
    });

    // Parse and validate the request body
    const body = await req.json();
    const data = qrcodeFormSchema.parse(body);

    if (data.id_kegiatan === null) {
      return NextResponse.json(
        { message: 'Invalid qrcodeId = null' },
        { status: 400 }
      );
    }

    const kegiatan = await prisma.kegiatan.findUnique({
      where: {
        id: data.id_kegiatan
      }
    });

    if (kegiatan == null) {
      return NextResponse.json(
        { message: 'Kegiatan not found' },
        { status: 404 }
      );
    }

    const hashedKey = await bcrypt.hash(kegiatan?.judul, 10);

    // Create the user in the database
    await prisma.qrCode.create({
      data: {
        key: hashedKey,
        id_kegiatan: data.id_kegiatan
      }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'Create qrcode successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    // Handle any errors during the deletion
    console.error('Error creating location:', error);
    return NextResponse.json(
      { message: 'Error creating location', error: error.message },
      { status: 500 }
    );
  }
}
