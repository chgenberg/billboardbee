import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/app/lib/prisma';

// GET /api/permits?billboardId=...
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

    const permits = await prisma.buildingPermit.findMany({
      where: {
        billboardId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new Response(JSON.stringify(permits), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching permits:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// POST /api/permits
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
    const { documentUrl, expiryDate, billboardId } = body;

    if (!documentUrl || !expiryDate || !billboardId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const permit = await prisma.buildingPermit.create({
      data: {
        documentUrl,
        expiryDate: new Date(expiryDate),
        billboardId,
      },
    });

    return new Response(JSON.stringify(permit), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating permit:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// PATCH /api/permits?id=...
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
      return new Response('Permit ID is required', { status: 400 });
    }

    const body = await request.json();
    const { status, expiryDate } = body;

    const permit = await prisma.buildingPermit.update({
      where: { id },
      data: {
        status,
        expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      },
    });

    return new Response(JSON.stringify(permit), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating permit:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 