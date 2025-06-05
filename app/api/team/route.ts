import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET /api/team?billboardId=...
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

  const teamMembers = await prisma.teamMember.findMany({
    where: { billboardId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(teamMembers);
}

// POST /api/team
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const teamMember = await prisma.teamMember.create({
      data: {
        email: data.email,
        role: data.role,
        billboardId: data.billboardId,
      },
    });
    return NextResponse.json(teamMember);
  } catch (error) {
    return NextResponse.json({ error: 'Could not create team member' }, { status: 400 });
  }
}

// DELETE /api/team?id=...
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  await prisma.teamMember.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
} 