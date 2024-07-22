// File: app/api/kegiatan/delete/[eventId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance

export async function DELETE(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    // Ensure we're dealing with a DELETE request
    if (req.method !== 'DELETE') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Extract the eventId from the URL
    const eventId = parseInt(params.eventId);

    // Validate eventId
    if (!eventId) {
      return NextResponse.json(
        { message: 'eventId is required' },
        { status: 400 }
      );
    }

    // Ensure eventId is a number
    if (isNaN(eventId)) {
      return NextResponse.json({ message: 'Invalid eventId' }, { status: 404 });
    }

    // Perform the deletion operation
    await prisma.kegiatan.delete({
      where: { id: eventId }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'Kegiatan deleted successfully' },
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
