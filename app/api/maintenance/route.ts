import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/app/lib/prisma';

// GET /api/maintenance?billboardId=...
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

    const tickets = await prisma.maintenanceTicket.findMany({
      where: {
        billboardId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new Response(JSON.stringify(tickets), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching maintenance tickets:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// POST /api/maintenance
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
    const { title, description, priority, billboardId, imageUrl } = body;

    if (!title || !description || !billboardId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const ticket = await prisma.maintenanceTicket.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        billboardId,
        imageUrl,
      },
    });

    return new Response(JSON.stringify(ticket), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating maintenance ticket:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// PATCH /api/maintenance?id=...
export async function PATCH(request: NextRequest) {
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
      return new Response('Ticket ID is required', { status: 400 });
    }

    const body = await request.json();
    const { status, assignedTo } = body;

    const ticket = await prisma.maintenanceTicket.update({
      where: { id },
      data: {
        status,
        assignedTo,
      },
    });

    return new Response(JSON.stringify(ticket), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating maintenance ticket:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 