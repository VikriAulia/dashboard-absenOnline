import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance
import { eventFormSchema } from '@/types';
import { z } from 'zod';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    // Validate eventId from params
    const eventId = parseInt(params.eventId, 10);
    if (isNaN(eventId)) {
      return NextResponse.json({ message: 'Invalid eventId' }, { status: 400 });
    }

    // Parse and validate the request body
    const body = await req.json();
    const parsedData = eventFormSchema.parse(body);

    // Prepare the update data
    const updateData = {
      judul: parsedData.judul,
      deskripsi: parsedData.deskripsi,
      id_jadwal: parseInt(parsedData.id_jadwal, 10),
      id_lokasi: parseInt(parsedData.id_lokasi, 10),
      id_pengguna: parseInt(parsedData.id_pengguna, 10)
    };

    // Perform the update operation
    await prisma.kegiatan.update({
      where: { id: eventId },
      data: updateData
    });

    // Send a success response
    return NextResponse.json(
      { message: 'Kegiatan updated successfully', kegiatan: updateData },
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
    console.error('Error updating kegiatan:', error);
    return NextResponse.json(
      { message: 'Error updating kegiatan', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  // Redirect POST requests to PATCH method for update
  return PATCH(req, { params });
}
