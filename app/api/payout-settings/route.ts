import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET /api/payout-settings?billboardId=...
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

  const settings = await prisma.payoutSettings.findUnique({
    where: { billboardId },
  });

  return NextResponse.json(settings);
}

// POST /api/payout-settings
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const settings = await prisma.payoutSettings.create({
      data: {
        billboardId: data.billboardId,
        iban: data.iban,
        bankgiro: data.bankgiro,
        payoutFrequency: data.payoutFrequency,
        vatStatus: data.vatStatus,
        stripeAccountId: data.stripeAccountId,
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Could not create payout settings' }, { status: 400 });
  }
}

// PATCH /api/payout-settings?billboardId=...
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const billboardId = searchParams.get('billboardId');
  
  if (!billboardId) {
    return NextResponse.json({ error: 'Billboard ID required' }, { status: 400 });
  }

  try {
    const data = await req.json();
    const settings = await prisma.payoutSettings.update({
      where: { billboardId },
      data: {
        iban: data.iban,
        bankgiro: data.bankgiro,
        payoutFrequency: data.payoutFrequency,
        vatStatus: data.vatStatus,
        stripeAccountId: data.stripeAccountId,
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Could not update payout settings' }, { status: 400 });
  }
} 