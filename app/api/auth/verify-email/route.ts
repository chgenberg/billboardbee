import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: 'Verifieringstoken saknas' },
        { status: 400 }
      );
    }

    // Hitta användaren med denna verifieringstoken
    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Ogiltig eller utgången verifieringstoken' },
        { status: 400 }
      );
    }

    // Kontrollera om token har gått ut
    if (user.tokenExpiresAt && new Date() > user.tokenExpiresAt) {
      return NextResponse.json(
        { 
          message: 'Verifieringstoken har gått ut',
          expired: true
        },
        { status: 400 }
      );
    }

    // Uppdatera användarens verifieringsstatus
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        tokenExpiresAt: null,
      },
    });

    return NextResponse.json(
      { message: 'E-postadress verifierad' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verifieringsfel:', error);
    return NextResponse.json(
      { message: 'Ett fel uppstod vid verifiering av e-postadress' },
      { status: 500 }
    );
  }
} 