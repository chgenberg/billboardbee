import { NextRequest } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(['UTHYRARE', 'ANNONSOR']),
});

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return new Response('Invalid token', { status: 401 });
    }

    // Check if user is admin (you might want to add an admin role to your UserRole enum)
    if (payload.role !== 'UTHYRARE') {
      return new Response('Forbidden', { status: 403 });
    }

    const body = await request.json();
    const { userId, role } = updateRoleSchema.parse(body);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 