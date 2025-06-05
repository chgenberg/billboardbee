import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET /api/permits?billboardId=...
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

  const permits = await prisma.buildingPermit.findMany({
    where: { billboardId },
    orderBy: { expiryDate: 'asc' },
  });

  return NextResponse.json(permits);
}

// POST /api/permits
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const permit = await prisma.buildingPermit.create({
      data: {
        documentUrl: data.documentUrl,
        status: data.status,
        expiryDate: new Date(data.expiryDate),
        billboardId: data.billboardId,
      },
    });
    return NextResponse.json(permit);
  } catch (error) {
    return NextResponse.json({ error: 'Could not create building permit' }, { status: 400 });
  }
}

// PATCH /api/permits?id=...
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
    const permit = await prisma.buildingPermit.update({
      where: { id },
      data: {
        status: data.status,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      },
    });
    return NextResponse.json(permit);
  } catch (error) {
    return NextResponse.json({ error: 'Could not update building permit' }, { status: 400 });
  }
} 