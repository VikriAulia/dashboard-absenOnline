// File: app/api/user/update/[userId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance
import { userFormSchema } from '@/types';
import { z } from 'zod';

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Validate userId from params
    const userId = parseInt(params.userId);
    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
    }

    // Parse and validate the request body
    const body = await req.json();
    const parsedBody = userFormSchema.parse(body);

    // Perform the update operation
    const updatedUser = await prisma.dashboardUser.update({
      where: {
        id: userId
      },
      data: {
        name: parsedBody.name,
        email: parsedBody.email,
        password: parsedBody.password,
        role: parsedBody.role
      }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'User update successfully', user: updatedUser },
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
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Error updating user', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  // Redirect POST requests to PATCH method for update
  return PATCH(req, { params });
}
