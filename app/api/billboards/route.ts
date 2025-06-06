import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { verifyToken } from '@/lib/auth';
import { jwtVerify } from 'jose';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

async function saveFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = path.extname(file.name) || '.jpg';
  const filename = `${uuidv4()}${ext}`;
  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function POST(req: Request) {
  // Extrahera JWT-token från Authorization-headern
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  let userId;

  try {
    const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    userId = decoded.payload.sub;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }

  try {
    // Säkerställ att uploadDir finns
    await fs.mkdir(uploadDir, { recursive: true });

    // Läs multipart-form-data
    const formData = await req.formData();

    // Hantera bilder
    const coverImage = formData.get('coverImage') as File | null;
    const gallery = formData.getAll('gallery') as File[];
    const imageUrls: string[] = [];

    if (coverImage) {
      const url = await saveFile(coverImage);
      imageUrls.push(url);
    }
    for (const file of gallery) {
      if (file && file.size > 0) {
        const url = await saveFile(file);
        imageUrls.push(url);
      }
    }

    // Övriga fält
    const title = formData.get('title') as string;
    const trafficTeaser = formData.get('trafficTeaser') as string;
    const teaser = formData.get('teaser') as string;
    const basePrice = parseInt(formData.get('basePrice') as string);
    const peakPrice = parseInt(formData.get('peakPrice') as string);
    const lat = parseFloat(formData.get('lat') as string);
    const lng = parseFloat(formData.get('lng') as string);
    const cta = formData.get('cta') as string;
    const standardDays = formData.get('standardDays') as string;
    const peakDays = formData.get('peakDays') as string;

    // Skapa annons i databasen
    const billboard = await prisma.billboard.create({
      data: {
        title,
        description: teaser,
        imageUrls,
        location: trafficTeaser,
        latitude: lat,
        longitude: lng,
        price: basePrice,
        status: 'ledig',
        ownerId: userId,
      },
    });

    return NextResponse.json({ success: true, billboard });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Något gick fel' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const billboards = await prisma.billboard.findMany({
      where: {
        status: 'ledig'
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrls: true,
        location: true,
        price: true,
        status: true,
        size: true,
        type: true,
        traffic: true,
        region: true,
        latitude: true,
        longitude: true,
        address: true,
        createdAt: true
      }
    });

    // Return only unique billboards based on id
    const uniqueBillboards = Array.from(new Map(billboards.map(item => [item.id, item])).values());

    return NextResponse.json(uniqueBillboards);
  } catch (error) {
    console.error('Error fetching billboards:', error);
    return NextResponse.json(
      [],
      { status: 500 }
    );
  }
} 