// File: app/api/user/update/[locationId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance
import { LocationFormValuesTypes, locationFormSchema } from '@/types';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export async function PATCH(
  req: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    // Validate locationId from params
    const locationId = parseInt(params.locationId);
    if (isNaN(locationId)) {
      return NextResponse.json(
        { message: 'Invalid locationId' },
        { status: 400 }
      );
    }

    // Parse and validate the request body
    const body = await req.json();
    const parsedData = locationFormSchema.parse(body);

    // Conditionally hash the password if it's provided
    let updateData: LocationFormValuesTypes = {
      nama: parsedData.nama,
      latitude: parsedData.latitude,
      longitude: parsedData.longitude,
      area: parsedData.area
    };

    // Perform the update operation
    await prisma.lokasi.update({
      where: { id: locationId },
      data: updateData
    });

    // Send a success response
    return NextResponse.json(
      { message: 'Location update successfully', lokasi: updateData },
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
  { params }: { params: { locationId: string } }
) {
  // Redirect POST requests to PATCH method for update
  return PATCH(req, { params });
}
