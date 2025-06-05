import { z } from 'zod';
import { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return new Response('Invalid or expired token', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return new Response('Password reset successfully', { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 