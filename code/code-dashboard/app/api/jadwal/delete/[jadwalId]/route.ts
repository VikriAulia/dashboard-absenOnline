// File: app/api/user/delete/[jadwalId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils';
import { Prisma } from '@prisma/client';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { jadwalId: string } }
) {
  try {
    // Ensure we're dealing with a DELETE request
    if (req.method !== 'DELETE') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Extract the jadwalId from the URL
    const jadwalId = parseInt(params.jadwalId);

    // Validate jadwalId
    if (!jadwalId) {
      return NextResponse.json(
        { message: 'jadwalId is required' },
        { status: 400 }
      );
    }

    // Ensure jadwalId is a number
    if (isNaN(jadwalId)) {
      return NextResponse.json(
        { message: 'Invalid jadwalId' },
        { status: 400 }
      );
    }

    // Perform the deletion operation
    await prisma.jadwal.delete({
      where: { id: jadwalId }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'location deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case 'P2025':
          return NextResponse.json(
            { message: 'Record to delete does not exist.' },
            { status: 404 }
          );
        case 'P2003':
          return NextResponse.json(
            { message: 'Foreign key constraint failed on delete.' },
            { status: 400 }
          );
        default:
          console.error('Prisma Error:', error.code, error.message);
          return NextResponse.json(
            { message: 'An error occurred while deleting the record.' },
            { status: 500 }
          );
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      // Handle validation errors
      return NextResponse.json(
        { message: 'Invalid data provided for deletion.' },
        { status: 400 }
      );
    } else {
      // Handle any other unexpected errors
      console.error('Unexpected error:', error);
      return NextResponse.json(
        { message: 'An unexpected error occurred.' },
        { status: 500 }
      );
    }
  }
}
