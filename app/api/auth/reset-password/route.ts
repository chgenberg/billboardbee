import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token och lösenord krävs' },
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

    // Hasha det nya lösenordet
    const hashedPassword = await hash(password, 12);

    // Uppdatera användarens lösenord och ta bort reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    // Lägg till det nya lösenordet i lösenordshistoriken
    await prisma.passwordHistory.create({
      data: {
        userId: user.id,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'Lösenordet har återställts' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fel vid återställning av lösenord:', error);
    return NextResponse.json(
      { message: 'Ett fel uppstod vid återställning av lösenord' },
      { status: 500 }
    );
  }
} 