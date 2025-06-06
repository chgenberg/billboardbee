import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Skapa en array med alla bildnamn
  const imageUrls = Array.from({ length: 28 }, (_, i) => `/billboards/bb${i + 1}.png`);
  const billboards = await prisma.billboard.findMany();
  for (const bb of billboards) {
    // Om någon bild i imageUrls är en placehold.co-URL, byt ut hela arrayen mot en slumpmässig lokal bild
    const hasPlaceholder = bb.imageUrls.some((url: string) => url.includes('placehold.co'));
    if (hasPlaceholder) {
      const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      await prisma.billboard.update({
        where: { id: bb.id },
        data: { imageUrls: [randomImage] },
      });
      console.log(`Updated billboard ${bb.id} with image ${randomImage}`);
    }
  }
  console.log('Done!');
}

main().finally(() => prisma.$disconnect()); 