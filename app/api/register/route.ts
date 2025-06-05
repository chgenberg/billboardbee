import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }
    const validRole = ['uthyrare', 'annonsor'].includes(role) ? role : 'annonsor';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: validRole,
        emailVerified: true,
        passwordHistory: {
          create: {
            password: hashedPassword,
          },
        },
      },
    });
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
} 