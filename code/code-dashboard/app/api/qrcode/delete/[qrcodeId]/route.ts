// File: app/api/user/delete/[qrcodeId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { qrcodeId: string } }
) {
  try {
    // Ensure we're dealing with a DELETE request
    if (req.method !== 'DELETE') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Extract the qrcodeId from the URL
    const qrcodeId = parseInt(params.qrcodeId);

    // Validate qrcodeId
    if (!qrcodeId) {
      return NextResponse.json(
        { message: 'qrcodeId is required' },
        { status: 400 }
      );
    }

    // Ensure qrcodeId is a number
    if (isNaN(qrcodeId)) {
      return NextResponse.json(
        { message: 'Invalid qrcodeId' },
        { status: 400 }
      );
    }

    // Perform the deletion operation
    await prisma.qrCode.delete({
      where: { id: qrcodeId }
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
