import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

// Swedish cities with their coordinates
const swedishLocations = [
  { city: 'Stockholm', lat: 59.3293, lng: 18.0686, region: 'Stockholms län' },
  { city: 'Göteborg', lat: 57.7089, lng: 11.9746, region: 'Västra Götalands län' },
  { city: 'Malmö', lat: 55.6049, lng: 13.0038, region: 'Skåne län' },
  { city: 'Uppsala', lat: 59.8586, lng: 17.6389, region: 'Uppsala län' },
  { city: 'Västerås', lat: 59.6162, lng: 16.5528, region: 'Västmanlands län' },
  { city: 'Örebro', lat: 59.2753, lng: 15.2134, region: 'Örebro län' },
  { city: 'Linköping', lat: 58.4108, lng: 15.6214, region: 'Östergötlands län' },
  { city: 'Helsingborg', lat: 56.0465, lng: 12.6945, region: 'Skåne län' },
  { city: 'Jönköping', lat: 57.7826, lng: 14.1618, region: 'Jönköpings län' },
  { city: 'Norrköping', lat: 58.5877, lng: 16.1924, region: 'Östergötlands län' },
  { city: 'Lund', lat: 55.7047, lng: 13.1910, region: 'Skåne län' },
  { city: 'Umeå', lat: 63.8258, lng: 20.2630, region: 'Västerbottens län' },
  { city: 'Gävle', lat: 60.6745, lng: 17.1417, region: 'Gävleborgs län' },
  { city: 'Borås', lat: 57.7210, lng: 12.9401, region: 'Västra Götalands län' },
  { city: 'Södertälje', lat: 59.1955, lng: 17.6252, region: 'Stockholms län' },
];

const billboardTypes = ['digital', 'print'];
const billboardSizes = ['3x6', '4x8', '5x10', '6x12'];
const statuses = ['ledig', 'bokad', 'underhåll'];

async function main() {
  // Create a test user if it doesn't exist
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: await hash('password123', 12),
      name: 'Test User',
      emailVerified: true,
    },
  });

  // Create 30 billboards
  for (let i = 0; i < 30; i++) {
    const location = swedishLocations[Math.floor(Math.random() * swedishLocations.length)];
    const type = billboardTypes[Math.floor(Math.random() * billboardTypes.length)];
    const size = billboardSizes[Math.floor(Math.random() * billboardSizes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Add some random variation to coordinates to spread them around the city
    const latVariation = (Math.random() - 0.5) * 0.1;
    const lngVariation = (Math.random() - 0.5) * 0.1;

    await prisma.billboard.create({
      data: {
        title: `${location.city} Skylt ${i + 1}`,
        description: `Premium ${type} skylt i ${location.city}. Perfekt plats för att nå lokala kunder. ${size} meter stor skylt med hög synlighet.`,
        imageUrls: [
          'https://placehold.co/600x400/2563eb/ffffff?text=Billboard+1',
          'https://placehold.co/600x400/2563eb/ffffff?text=Billboard+2'
        ],
        location: location.city,
        latitude: location.lat + latVariation,
        longitude: location.lng + lngVariation,
        price: Math.floor(Math.random() * 5000) + 1000, // Random price between 1000-6000
        status: status,
        size: size,
        type: type,
        traffic: Math.floor(Math.random() * 50000) + 1000, // Random traffic between 1000-51000
        availableFrom: new Date(),
        availableTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Available for 1 year
        contactPhone: '070-123 45 67',
        address: `${Math.floor(Math.random() * 100) + 1} ${location.city} gata`,
        region: location.region,
        ownerId: testUser.id,
      },
    });
  }

  // Skapa Pärs användare om den inte redan finns
  const parEmail = 'par@philipson.se';
  const existingPar = await prisma.user.findUnique({
    where: { email: parEmail }
  });

  if (!existingPar) {
    const hashedPassword = await hash('password123', 10);
    await prisma.user.create({
      data: {
        email: parEmail,
        password: hashedPassword,
        name: 'Pär Philipson',
        role: 'UTHYRARE',
        emailVerified: true
      }
    });
    console.log('Created Pärs user');
  } else {
    console.log('Pärs user already exists');
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 