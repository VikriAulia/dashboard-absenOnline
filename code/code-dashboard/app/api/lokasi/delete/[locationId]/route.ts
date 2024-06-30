// File: app/api/user/delete/[locationId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { locationId: string } }
) {
  try {
    // Ensure we're dealing with a DELETE request
    if (req.method !== 'DELETE') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Extract the locationId from the URL
    const locationId = parseInt(params.locationId);

    // Validate locationId
    if (!locationId) {
      return NextResponse.json(
        { message: 'locationId is required' },
        { status: 400 }
      );
    }

    // Ensure locationId is a number
    if (isNaN(locationId)) {
      return NextResponse.json({ message: 'Invalid locationId' }, { status: 400 });
    }

    // Perform the deletion operation
    await prisma.lokasi.delete({
      where: { id: locationId }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'location deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle any errors during the deletion
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Error deleting user', error: error.message },
      { status: 500 }
    );
  }
}
