// Usage: npx tsx scripts/clear-users-and-passwords.ts
// This script deletes ALL users and ALL password history. Use with caution!

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.passwordHistory.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Alla användare och all password history är nu borttagna!');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 