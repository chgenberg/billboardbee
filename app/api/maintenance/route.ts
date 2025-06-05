import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET /api/maintenance?billboardId=...
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const billboardId = searchParams.get('billboardId');
  
  if (!billboardId) {
    return NextResponse.json({ error: 'Billboard ID required' }, { status: 400 });
  }

  const tickets = await prisma.maintenanceTicket.findMany({
    where: { billboardId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(tickets);
}

// POST /api/maintenance
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const ticket = await prisma.maintenanceTicket.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        imageUrl: data.imageUrl,
        billboardId: data.billboardId,
        assignedTo: data.assignedTo,
      },
    });
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: 'Could not create maintenance ticket' }, { status: 400 });
  }
}

// PATCH /api/maintenance?id=...
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  try {
    const data = await req.json();
    const ticket = await prisma.maintenanceTicket.update({
      where: { id },
      data: {
        status: data.status,
        priority: data.priority,
        assignedTo: data.assignedTo,
      },
    });
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: 'Could not update maintenance ticket' }, { status: 400 });
  }
} 