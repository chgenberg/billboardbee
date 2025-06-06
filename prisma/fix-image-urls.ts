import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Skapa en array med alla bildnamn
  const imageUrls = Array.from({ length: 28 }, (_, i) => `/billboards/bb${i + 1}.png`);
  const billboards = await prisma.billboard.findMany();
  for (const bb of billboards) {
    // Välj en slumpmässig bild
    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    await prisma.billboard.update({
      where: { id: bb.id },
      data: { imageUrls: [randomImage] },
    });
    console.log(`Updated billboard ${bb.id} with image ${randomImage}`);
  }
  console.log('Done!');
}

main().finally(() => prisma.$disconnect()); 