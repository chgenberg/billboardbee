import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response('Invalid token', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const billboardId = searchParams.get('billboardId');

    if (!billboardId) {
      return new Response('Billboard ID is required', { status: 400 });
    }

    const teamMembers = await prisma.teamMember.findMany({
      where: {
        billboardId,
      },
    });

    return new Response(JSON.stringify(teamMembers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response('Invalid token', { status: 401 });
    }

    const body = await request.json();
    const { email, role, billboardId } = body;

    if (!email || !role || !billboardId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        email,
        role,
        billboardId,
      },
    });

    return new Response(JSON.stringify(teamMember), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response('Invalid token', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response('Team member ID is required', { status: 400 });
    }

    await prisma.teamMember.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 