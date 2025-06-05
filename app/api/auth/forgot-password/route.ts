import { z } from 'zod';
import { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import prisma from '@/app/lib/prisma';
import { randomBytes } from 'crypto';
import { sendPasswordResetEmail } from '@/app/lib/email';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success even if user doesn't exist to prevent email enumeration
      return new Response('If an account exists, a password reset email has been sent', { status: 200 });
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    await sendPasswordResetEmail(user.email, resetToken);

    return new Response('If an account exists, a password reset email has been sent', { status: 200 });
  } catch (error) {
    console.error('Error processing forgot password request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 