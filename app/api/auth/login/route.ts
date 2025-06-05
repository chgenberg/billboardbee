import { z } from 'zod';
import { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

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
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const token = await new SignJWT({ userId: 'dummy-annonsor-id', email: 'investor@example.com', role: 'ANNONSOR' })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(secret);

      return new Response(JSON.stringify({ 
        token,
        user: {
          id: 'dummy-annonsor-id',
          email: 'investor@example.com',
          role: 'ANNONSOR',
          name: 'Test Annonsör'
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (email === 'investor2@example.com' && password === 'investor123') {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const token = await new SignJWT({ userId: 'dummy-uthyrare-id', email: 'investor2@example.com', role: 'UTHYRARE' })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(secret);

      return new Response(JSON.stringify({ 
        token,
        user: {
          id: 'dummy-uthyrare-id',
          email: 'investor2@example.com',
          role: 'UTHYRARE',
          name: 'Test Uthyrare'
        }
      }), {
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
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    return new Response(JSON.stringify({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 