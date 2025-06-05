import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Skapa en testanvändare om den inte redan finns
  const testUser = await prisma.user.upsert({
    where: { email: 'test@billboardbee.se' },
    update: {},
    create: {
      email: 'test@billboardbee.se',
      password: 'hashed_password_here', // Detta bör hashas i produktion
      name: 'Test User',
      emailVerified: true,
    },
  });

  // Skapa 5 nya billboard-objekt
  const billboards = [
    {
      title: 'Premium Digital Billboard - E4',
      description: 'Strategiskt placerad digital skylt vid E4:ans infart till Stockholm. Hög synlighet med över 100,000 bilar per dygn. Perfekt för större kampanjer och varumärken som vill nå en bred publik.',
      imageUrls: ['/billboards/bb1.png'],
      location: 'E4, Stockholm',
      latitude: 59.3293,
      longitude: 18.0686,
      price: 25000,
      status: 'ledig',
      size: '6x3 meter',
      type: 'digital',
      traffic: 120000,
      availableFrom: new Date(),
      availableTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      contactPhone: '070-123 45 67',
      address: 'E4, 171 48 Solna',
      region: 'Stockholm',
      ownerId: testUser.id,
    },
    {
      title: 'Klassisk Skylt - Södermalm',
      description: 'Charmig klassisk skylt i hjärtat av Södermalm. Perfekt för lokala företag och evenemang. Hög fotgängartrafik och god synlighet från gatan.',
      imageUrls: ['/billboards/bb2.png'],
      location: 'Södermalm, Stockholm',
      latitude: 59.3158,
      longitude: 18.0711,
      price: 12000,
      status: 'ledig',
      size: '4x2 meter',
      type: 'print',
      traffic: 25000,
      availableFrom: new Date(),
      availableTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      contactPhone: '070-234 56 78',
      address: 'Götgatan 45, 118 26 Stockholm',
      region: 'Stockholm',
      ownerId: testUser.id,
    },
    {
      title: 'Digital Skylt - Norrmalm',
      description: 'Modern digital skylt i centrala Norrmalm. Högupplöst skärm med möjlighet till dynamiskt innehåll. Perfekt för större varumärken och kampanjer.',
      imageUrls: ['/billboards/bb3.png'],
      location: 'Norrmalm, Stockholm',
      latitude: 59.3346,
      longitude: 18.0632,
      price: 30000,
      status: 'ledig',
      size: '8x4 meter',
      type: 'digital',
      traffic: 150000,
      availableFrom: new Date(),
      availableTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      contactPhone: '070-345 67 89',
      address: 'Kungsgatan 20, 111 35 Stockholm',
      region: 'Stockholm',
      ownerId: testUser.id,
    },
    {
      title: 'Skylt vid T-Centralen',
      description: 'Strategiskt placerad skylt vid Stockholms centralstation. Når över 300,000 resenärer dagligen. Perfekt för kampanjer som vill nå en stor och varierad publik.',
      imageUrls: ['/billboards/bb4.png'],
      location: 'T-Centralen, Stockholm',
      latitude: 59.3304,
      longitude: 18.0587,
      price: 35000,
      status: 'ledig',
      size: '5x3 meter',
      type: 'digital',
      traffic: 300000,
      availableFrom: new Date(),
      availableTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      contactPhone: '070-456 78 90',
      address: 'Vasagatan 1, 111 20 Stockholm',
      region: 'Stockholm',
      ownerId: testUser.id,
    },
    {
      title: 'Skylt vid Slussen',
      description: 'Ikonisk plats vid Slussen med hög synlighet. Perfekt för lokala evenemang och kampanjer. God exponering mot både fotgängare och biltrafik.',
      imageUrls: ['/billboards/bb5.png'],
      location: 'Slussen, Stockholm',
      latitude: 59.3204,
      longitude: 18.0719,
      price: 18000,
      status: 'ledig',
      size: '4x2.5 meter',
      type: 'print',
      traffic: 80000,
      availableFrom: new Date(),
      availableTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      contactPhone: '070-567 89 01',
      address: 'Slussplan 1, 111 30 Stockholm',
      region: 'Stockholm',
      ownerId: testUser.id,
    }
  ];

  // Lägg till billboards i databasen
  for (const billboard of billboards) {
    await prisma.billboard.create({
      data: billboard,
    });
  }

  // Hämta alla billboards
  const allBillboards = await prisma.billboard.findMany();

  // Lista på exempelbilder
  const exampleImages = [
    '/billboards/bb1.png',
    '/billboards/bb2.png',
    '/billboards/bb3.png',
    '/billboards/bb4.png',
    '/billboards/bb5.png',
    '/billboards/bb6.png',
  ];

  for (let i = 0; i < allBillboards.length; i++) {
    const img = exampleImages[i % exampleImages.length];
    await prisma.billboard.update({
      where: { id: allBillboards[i].id },
      data: {
        imageUrls: { set: [img] },
      },
    });
  }

  console.log('Seed data har lagts till i databasen');
  console.log('Alla billboards har nu fått provbilder!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 