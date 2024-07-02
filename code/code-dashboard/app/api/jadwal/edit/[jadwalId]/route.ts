// File: app/api/user/update/[jadwalId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance
import { JadwalFormValuesTypes, jadwalFormSchema } from '@/types';
import { z } from 'zod';

export async function PATCH(
  req: Request,
  { params }: { params: { jadwalId: string } }
) {
  try {
    // Validate jadwalId from params
    const jadwalId = parseInt(params.jadwalId);
    if (isNaN(jadwalId)) {
      return NextResponse.json(
        { message: 'Invalid jadwalId' },
        { status: 400 }
      );
    }

    // Parse and validate the request body
    const body = await req.json();
    const parsedData = jadwalFormSchema.parse(body);

    // Conditionally hash the password if it's provided
    let updateData: JadwalFormValuesTypes = {
      nama: parsedData.nama,
      jamMulai: parsedData.jamMulai,
      jamSelesai: parsedData.jamSelesai,
      keterangan: parsedData.keterangan
    };

    // Perform the update operation
    await prisma.jadwal.update({
      where: { id: jadwalId },
      data: {
        nama: updateData.nama,
        mulai: updateData.jamMulai,
        selesai: updateData.jamSelesai,
        keterangan: updateData.keterangan
      }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'Location update successfully', jadwal: updateData },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle Zod validation errors specifically
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    // Handle any errors during the update
    console.error('Error updating location:', error);
    return NextResponse.json(
      { message: 'Error updating location', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { jadwalId: string } }
) {
  // Redirect POST requests to PATCH method for update
  return PATCH(req, { params });
}
