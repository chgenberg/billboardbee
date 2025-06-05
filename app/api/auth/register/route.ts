import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { sendVerificationEmail } from '@/lib/email';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { UserRole } from '@/app/types/user';

// Skapa en global Prisma-klient
const prisma = new PrismaClient();

// Valideringsschema för registrering
const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'E-postadress krävs')
    .email('Ogiltig e-postadress')
    .transform(val => val.toLowerCase().trim()),
  password: z
    .string()
    .min(8, 'Lösenordet måste vara minst 8 tecken')
    .regex(/[A-Z]/, 'Lösenordet måste innehålla minst en stor bokstav')
    .regex(/[a-z]/, 'Lösenordet måste innehålla minst en liten bokstav')
    .regex(/[0-9]/, 'Lösenordet måste innehålla minst en siffra')
    .regex(/[^A-Za-z0-9]/, 'Lösenordet måste innehålla minst ett specialtecken'),
  name: z
    .string()
    .min(1, 'Namn krävs')
    .optional()
    .transform(val => val?.trim() || null),
  role: z
    .enum(['UTHYRARE', 'ANNONSOR'] as const)
    .default('ANNONSOR'),
});

// Token utgår efter 24 timmar
const TOKEN_EXPIRATION_HOURS = 24;

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request as any);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const body = await request.json();

    // Validera input med Zod
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message);
      return NextResponse.json(
        { message: 'Valideringsfel', errors },
        { status: 400 }
      );
    }

    const { email, password, name, role } = validationResult.data;
    console.log('Registration attempt with role:', role); // Debug-loggning

    // Kontrollera om användaren redan finns
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'En användare med denna e-postadress finns redan' },
        { status: 400 }
      );
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 12);

    // Skapa användaren
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: role,
        emailVerified: true,
        passwordHistory: {
          create: {
            password: hashedPassword,
          },
        },
      },
    });

    // Ta bort lösenordet från svaret
    const { password: _, ...userWithoutPassword } = user;

    // Logga lyckad registrering med mer detaljer
    console.log('User created successfully:', {
      email: user.email,
      role: user.role,
      id: user.id
    });

    return NextResponse.json(
      { 
        message: 'Användare skapad.', 
        user: userWithoutPassword,
        success: true 
      },
      { status: 201 }
    );
  } catch (error) {
    // Detaljerad felhantering
    console.error('Registreringsfel:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Valideringsfel', 
          errors: error.errors.map(err => err.message) 
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Ett oväntat fel uppstod vid registrering' },
      { status: 500 }
    );
  }
} 