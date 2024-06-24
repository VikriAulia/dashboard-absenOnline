// File: app/api/user/delete/[userId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Ensure we're dealing with a DELETE request
    if (req.method !== 'DELETE') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Extract the userId from the URL
    const userId = parseInt(params.userId);

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { message: 'userId is required' },
        { status: 400 }
      );
    }

    // Ensure userId is a number
    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
    }

    // Ensure is not admin, not allow to delete admin account
    if (userId === 1) {
      return NextResponse.json(
        { message: `Delete admin account not allowed` },
        { status: 403 }
      );
    }

    // check if the user have own event if true, change to admin event
    await prisma.event.updateMany({
      where: {
        organizerId: userId
      },
      data: {
        organizerId: 1 //admin ID
      }
    });

    // Perform the deletion operation
    await prisma.dashboardUser.delete({
      where: { id: userId }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'User deleted successfully' },
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
