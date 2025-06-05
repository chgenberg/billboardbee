import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const imageUrls = [
    '/billboards/bb1.png',
    '/billboards/bb2.png',
    '/billboards/bb3.png',
    '/billboards/bb4.png',
    '/billboards/bb5.png',
    '/billboards/bb6.png',
  ];
  const billboards = await prisma.billboard.findMany();
  for (const bb of billboards) {
    await prisma.billboard.update({
      where: { id: bb.id },
      data: { imageUrls },
    });
    console.log(`Updated billboard ${bb.id}`);
  }
  console.log('Done!');
}

main().finally(() => prisma.$disconnect()); 