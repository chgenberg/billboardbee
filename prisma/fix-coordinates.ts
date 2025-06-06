import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

async function getCoordinates(query: string): Promise<{ lat: number, lon: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'billboardbee-script/1.0' }
  });
  const data = await res.json() as any[];
  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  }
  return null;
}

async function main() {
  const billboards = await prisma.billboard.findMany({
    where: {
      OR: [
        { latitude: null },
        { longitude: null }
      ]
    }
  });

  for (const bb of billboards) {
    const query = `${bb.title} ${bb.location || ''}`.trim();
    console.log(`Söker koordinater för: ${query}`);
    const coords = await getCoordinates(query);
    if (coords) {
      await prisma.billboard.update({
        where: { id: bb.id },
        data: { latitude: coords.lat, longitude: coords.lon }
      });
      console.log(`Uppdaterade ${bb.title} med lat: ${coords.lat}, lon: ${coords.lon}`);
    } else {
      console.log(`Hittade inga koordinater för: ${query}`);
    }
    // OpenStreetMap Nominatim kräver delay mellan requests
    await new Promise(res => setTimeout(res, 1200));
  }
  console.log('Färdig!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect()); 