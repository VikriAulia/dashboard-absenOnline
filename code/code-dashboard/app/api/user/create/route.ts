// File: app/api/user/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/utils'; // Adjust the import path to your Prisma instance
import { userFormSchema } from '@/types';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
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
    const data = userFormSchema.parse(body);

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the user in the database
    await prisma.dashboardUser.create({
      data: {
        email: data.email,
        password: hashedPassword, // Ideally, hash the password before storing it
        role: data.role,
        name: data.name
      }
    });

    // Send a success response
    return NextResponse.json(
      { message: 'Create deleted successfully' },
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
