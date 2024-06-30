// File: app/api/user/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance
import { locationFormSchema } from '@/types';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    // Ensure we're dealing with a POST request
    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Parse and validate the request body
    const body = await req.json();
    const data = locationFormSchema.parse(body);

    // Create the user in the database
    await prisma.lokasi.create({
      data: {
        nama: data.nama,
        latitude: data.latitude,
        longitude: data.longitude,
        area: data.area
      }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'Create location successfully' },
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
