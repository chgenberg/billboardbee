import { NextResponse } from 'next/server';
import { PrismaClient, BookingStatus } from '@prisma/client';
import prisma from '@/lib/prisma';

// GET /api/bookings?billboardId=...&userId=...&from=...&to=...
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const billboardId = searchParams.get('billboardId');
  const userId = searchParams.get('userId');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const where: any = {};
  if (billboardId) where.billboardId = billboardId;
  if (userId) where.userId = userId;
  if (from && to) {
    where.OR = [
      { startDate: { gte: new Date(from), lte: new Date(to) } },
      { endDate: { gte: new Date(from), lte: new Date(to) } },
      { startDate: { lte: new Date(from) }, endDate: { gte: new Date(to) } },
    ];
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: { billboard: true, user: true },
    orderBy: { startDate: 'asc' },
  });
  return NextResponse.json(bookings);
}

// POST /api/bookings
export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Kontrollera överlappande bokningar (endast "confirmed")
    const overlapping = await prisma.booking.findFirst({
      where: {
        billboardId: data.billboardId,
        status: BookingStatus.CONFIRMED,
        OR: [
          { startDate: { lte: new Date(data.endDate) }, endDate: { gte: new Date(data.startDate) } },
        ],
      },
    });
    if (overlapping) {
      return NextResponse.json({ error: 'Perioden är redan bokad.' }, { status: 409 });
    }
    const booking = await prisma.booking.create({
      data: {
        billboardId: data.billboardId,
        userId: data.userId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: data.status || BookingStatus.REQUESTED,
      },
    });
    return NextResponse.json(booking);
  } catch (e) {
    return NextResponse.json({ error: 'Kunde inte skapa bokning.' }, { status: 400 });
  }
}

// PATCH /api/bookings?id=... (uppdatera status)
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID krävs' }, { status: 400 });
  const data = await req.json();
  const booking = await prisma.booking.update({
    where: { id },
    data: {
      status: data.status,
    },
  });
  return NextResponse.json(booking);
}

// DELETE /api/bookings?id=...
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID krävs' }, { status: 400 });
  await prisma.booking.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 