import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { email: 'par@philipson.se' },
    data: { role: UserRole.UTHYRARE },
  });
  console.log('Uppdaterade par@philipson.se till uthyrare');

  await prisma.user.update({
    where: { email: 'philipson@par.se' },
    data: { role: UserRole.ANNONSOR },
  });
  console.log('Uppdaterade philipson@par.se till annonsor');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 