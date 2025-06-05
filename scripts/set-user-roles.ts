import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { email: 'par@philipson.se' },
    data: { role: 'uthyrare' },
  });
  console.log('Uppdaterade par@philipson.se till uthyrare');

  await prisma.user.update({
    where: { email: 'philipson@par.se' },
    data: { role: 'annonsor' },
  });
  console.log('Uppdaterade philipson@par.se till annonsor');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 