import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/app/lib/prisma';

// GET /api/payout-settings?billboardId=...
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

    const settings = await prisma.payoutSettings.findUnique({
      where: {
        billboardId,
      },
    });

    return new Response(JSON.stringify(settings), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching payout settings:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// POST /api/payout-settings
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
    const { billboardId, iban, bankgiro, payoutFrequency, vatStatus, stripeAccountId } = body;

    if (!billboardId || !payoutFrequency) {
      return new Response('Missing required fields', { status: 400 });
    }

    const settings = await prisma.payoutSettings.create({
      data: {
        billboardId,
        iban,
        bankgiro,
        payoutFrequency,
        vatStatus: vatStatus || false,
        stripeAccountId,
      },
    });

    return new Response(JSON.stringify(settings), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating payout settings:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// PATCH /api/payout-settings?billboardId=...
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
    const billboardId = searchParams.get('billboardId');

    if (!billboardId) {
      return new Response('Billboard ID is required', { status: 400 });
    }

    const body = await request.json();
    const { iban, bankgiro, payoutFrequency, vatStatus, stripeAccountId } = body;

    const settings = await prisma.payoutSettings.update({
      where: { billboardId },
      data: {
        iban,
        bankgiro,
        payoutFrequency,
        vatStatus,
        stripeAccountId,
      },
    });

    return new Response(JSON.stringify(settings), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating payout settings:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 