import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prisma';
import { UserRole } from '@prisma/client';
import { NextRequest } from 'next/server';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.string().default('ANNONSOR'),
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request as NextRequest);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const body = await request.json();
    const { email, password, name, role } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response('Email already in use', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role as UserRole,
        emailVerified: true, // Mark as verified immediately
      },
    });

    return new Response('User registered successfully', { status: 201 });
  } catch (err) {
    console.error('Error during registration:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
} 