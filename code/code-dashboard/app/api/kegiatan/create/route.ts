// File: app/api/kegiatan/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance
import { eventFormSchema, eventFormValuesTypes } from '@/types';
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
    const data: eventFormValuesTypes = eventFormSchema.parse(body);

    // Create the user in the database
    await prisma.kegiatan.create({
      data: {
        judul: data.judul,
        deskripsi: data.deskripsi,
        id_jadwal: parseInt(data.id_jadwal),
        id_pengguna: parseInt(data.id_pengguna),
        id_lokasi: parseInt(data.id_lokasi)
      }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'Create kegiatan successfully' },
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
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Error creating user', error: error.message },
      { status: 500 }
    );
  }
}
