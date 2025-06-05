import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { verifyToken } from '@/lib/auth';

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
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ success: false, error: 'Ingen Authorization-header' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  const payload = await verifyToken(token);
  if (!payload || !payload.userId) {
    return NextResponse.json({ success: false, error: 'Ogiltig token' }, { status: 401 });
  }
  const userId = payload.userId as string;

  const { seedDemo } = await req.json();
  if (seedDemo) {
    // Hämta Pärs användar-id
    const parUser = await prisma.user.findUnique({ where: { email: 'par@philipson.se' } });
    if (!parUser) {
      return new Response(JSON.stringify({ success: false, error: 'Pärs användare saknas' }), { status: 400 });
    }
    // Rensa bort gamla billboards för Pär
    await prisma.billboard.deleteMany({ where: { ownerId: parUser.id } });
    const demoBillboards = [
      {
        title: 'Skylt vid Ängsvägen, Trosa',
        description: 'Den här skylten står mitt i ett blomstrande ängslandskap strax utanför Trosa.',
        imageUrls: ['/billboards/bb1.png'],
        location: 'Utanför Trosa, Södermanland',
        latitude: 58.8965,
        longitude: 17.5527,
        price: 12000,
        status: 'ledig',
        address: 'Ängsvägen 1, 619 91 Trosa',
        type: 'digital',
        traffic: 12000,
        contactPhone: '070-123 45 67',
        region: 'Södermanland',
      },
      {
        title: 'Skylt i Bokskogen, Halland',
        description: 'Skylt i Hallands bokskogar, synlig från grusvägen.',
        imageUrls: ['/billboards/bb2.png'],
        location: 'Bokskog, Halland',
        latitude: 56.7345,
        longitude: 12.8001,
        price: 11000,
        status: 'ledig',
        address: 'Bokvägen 12, 313 97 Simlångsdalen',
        type: 'print',
        traffic: 8000,
        contactPhone: '070-123 45 67',
        region: 'Halland',
      },
      {
        title: 'Skylt vid Kustvägen, Bohuslän',
        description: 'Skylt med utsikt över Bohusläns kustväg och havet.',
        imageUrls: ['/billboards/bb3.png'],
        location: 'Bohusläns kustväg',
        latitude: 58.3538,
        longitude: 11.2647,
        price: 15000,
        status: 'ledig',
        address: 'Kustvägen 101, 456 94 Hunnebostrand',
        type: 'digital',
        traffic: 18000,
        contactPhone: '070-123 45 67',
        region: 'Bohuslän',
      },
      {
        title: 'Skylt vid Fäbodvägen, Falun',
        description: 'Skylt på en gammal fäbodvall norr om Falun.',
        imageUrls: ['/billboards/bb4.png'],
        location: 'Norr om Falun, Dalarna',
        latitude: 60.6506,
        longitude: 15.6356,
        price: 9000,
        status: 'ledig',
        address: 'Fäbodvägen 3, 791 93 Falun',
        type: 'print',
        traffic: 7000,
        contactPhone: '070-123 45 67',
        region: 'Dalarna',
      },
      {
        title: 'Skylt vid Älvvägen, Jokkmokk',
        description: 'Skylt i ett fruset jordbrukslandskap utanför Jokkmokk.',
        imageUrls: ['/billboards/bb5.png'],
        location: 'Utanför Jokkmokk, Norrbotten',
        latitude: 66.6061,
        longitude: 19.8376,
        price: 13000,
        status: 'ledig',
        address: 'Älvvägen 7, 962 99 Jokkmokk',
        type: 'digital',
        traffic: 5000,
        contactPhone: '070-123 45 67',
        region: 'Norrbotten',
      },
      {
        title: 'Skylt vid Fjällvägen, Abisko',
        description: 'Skylt i Lapplands fjällvärld norr om Abisko.',
        imageUrls: ['/billboards/bb6.png'],
        location: 'Norr om Abisko, Lappland',
        latitude: 68.3833,
        longitude: 18.7833,
        price: 17000,
        status: 'ledig',
        address: 'Fjällvägen 1, 981 07 Abisko',
        type: 'print',
        traffic: 4000,
        contactPhone: '070-123 45 67',
        region: 'Lappland',
      },
      {
        title: 'Skylt i Stekenjokk, Jämtland',
        description: 'Skylt längs Vildmarksvägen vid Stekenjokk.',
        imageUrls: ['/billboards/bb7.png'],
        location: 'Stekenjokk, Jämtland',
        latitude: 64.9642,
        longitude: 14.1617,
        price: 12500,
        status: 'ledig',
        address: 'Vildmarksvägen 55, 880 37 Gäddede',
        type: 'digital',
        traffic: 6000,
        contactPhone: '070-123 45 67',
        region: 'Jämtland',
      },
      {
        title: 'Skylt vid Ängsmarken, Sigtuna',
        description: 'Skylt på blommande sommaräng utanför Sigtuna.',
        imageUrls: ['/billboards/bb8.png'],
        location: 'Utanför Sigtuna, Uppland',
        latitude: 59.6174,
        longitude: 17.7231,
        price: 10500,
        status: 'ledig',
        address: 'Ängsmarken 2, 193 91 Sigtuna',
        type: 'print',
        traffic: 9000,
        contactPhone: '070-123 45 67',
        region: 'Uppland',
      },
      {
        title: 'Skylt vid Isvägen, Rättvik',
        description: 'Skylt vid den frusna strandkanten norr om Rättvik.',
        imageUrls: ['/billboards/bb9.png'],
        location: 'Norr om Rättvik, Dalarna',
        latitude: 60.9500,
        longitude: 15.1333,
        price: 9500,
        status: 'ledig',
        address: 'Isvägen 4, 795 32 Rättvik',
        type: 'digital',
        traffic: 8500,
        contactPhone: '070-123 45 67',
        region: 'Dalarna',
      },
      {
        title: 'Skylt vid Rapsvägen, Kivik',
        description: 'Skylt bland rapsfält utanför Kivik.',
        imageUrls: ['/billboards/bb10.png'],
        location: 'Utanför Kivik, Österlen',
        latitude: 55.6925,
        longitude: 14.2281,
        price: 14000,
        status: 'ledig',
        address: 'Rapsvägen 10, 277 35 Kivik',
        type: 'print',
        traffic: 10000,
        contactPhone: '070-123 45 67',
        region: 'Skåne',
      },
    ];

    // Skapa billboards med ownerId = Pärs id
    for (const b of demoBillboards) {
      await prisma.billboard.create({
        data: {
          title: b.title,
          description: b.description,
          imageUrls: b.imageUrls,
          location: b.location,
          latitude: b.latitude,
          longitude: b.longitude,
          price: b.price,
          status: b.status,
          address: b.address,
          ownerId: parUser.id,
          type: b.type,
          traffic: b.traffic,
          contactPhone: b.contactPhone,
          region: b.region,
        },
      });
    }
    return new Response(JSON.stringify({ success: true, count: demoBillboards.length }), { status: 200 });
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
    const standardDays = formData.get('standardDays') as string; // JSON.stringify([...])
    const peakDays = formData.get('peakDays') as string; // JSON.stringify([...])

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
        // Lägg till custom-fält för perioder om du vill (t.ex. json-fält eller separat tabell)
        // peakPrice, standardDays, peakDays, cta etc kan sparas i extra fält eller json
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
    });

    return NextResponse.json(billboards || []);
  } catch (error) {
    console.error('Error fetching billboards:', error);
    return NextResponse.json(
      [],
      { status: 500 }
    );
  }
} 