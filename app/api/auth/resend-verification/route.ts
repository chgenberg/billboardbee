import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

const prisma = new PrismaClient();
const TOKEN_EXPIRATION_HOURS = 24;

export async function POST(request: Request) {
  try {
    // Rate limiting
    const limiter = await rateLimit(request);
    if (!limiter.success) {
      return NextResponse.json(
        { message: 'För många förfrågningar. Försök igen senare.' },
        { status: 429 }
      );
    }

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
      return NextResponse.json(
        { message: 'Ingen användare hittades med denna e-postadress' },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'E-postadressen är redan verifierad' },
        { status: 400 }
      );
    }

    // Generera ny token och utgångstid
    const verificationToken = randomBytes(32).toString('hex');
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setHours(tokenExpiresAt.getHours() + TOKEN_EXPIRATION_HOURS);

    // Uppdatera användaren med ny token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        tokenExpiresAt,
      },
    });

    // Skicka nytt verifieringsmail
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: 'Nytt verifieringsmail har skickats' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fel vid återsändning av verifieringsmail:', error);
    return NextResponse.json(
      { message: 'Ett fel uppstod vid återsändning av verifieringsmail' },
      { status: 500 }
    );
  }
} 