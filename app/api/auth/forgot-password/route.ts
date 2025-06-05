import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'E-postadress krävs' },
        { status: 400 }
      );
    }

    // Hitta användaren
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Returnera samma meddelande även om användaren inte finns
      // för att förhindra e-post enumeration
      return NextResponse.json(
        { message: 'Om e-postadressen finns i vårt system kommer du att få instruktioner för återställning av lösenord.' },
        { status: 200 }
      );
    }

    // Generera reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 timmar

    // Uppdatera användaren med reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    // Skicka e-post
    await sendPasswordResetEmail(user.email, resetToken);

    return NextResponse.json(
      { message: 'Om e-postadressen finns i vårt system kommer du att få instruktioner för återställning av lösenord.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fel vid lösenordsåterställning:', error);
    return NextResponse.json(
      { message: 'Ett fel uppstod vid hantering av lösenordsåterställning' },
      { status: 500 }
    );
  }
} 