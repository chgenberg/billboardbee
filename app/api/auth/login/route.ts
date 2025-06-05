import { z } from 'zod';
import { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Dummy login for investors
    if (email === 'investor@example.com' && password === 'investor123') {
      const token = sign(
        { userId: 'dummy-annonsor-id', email: 'investor@example.com', role: 'ANNONSOR' },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );
      return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (email === 'investor2@example.com' && password === 'investor123') {
      const token = sign(
        { userId: 'dummy-uthyrare-id', email: 'investor2@example.com', role: 'UTHYRARE' },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );
      return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response('Invalid email or password', { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return new Response('Invalid email or password', { status: 401 });
    }

    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 