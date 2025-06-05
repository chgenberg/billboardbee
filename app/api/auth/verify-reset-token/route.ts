import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Token saknas' },
        { status: 400 }
      );
    }

    // Hitta användaren med token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Ogiltig eller utgången återställningslänk' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Token är giltig' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fel vid verifiering av reset token:', error);
    return NextResponse.json(
      { message: 'Ett fel uppstod vid verifiering av återställningslänk' },
      { status: 500 }
    );
  }
} 