// Usage: npx tsx scripts/clear-all-data.ts
// This script deletes ALL billboards, ALL users, and ALL password history. Use with caution!

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.billboard.deleteMany({});
  await prisma.passwordHistory.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Alla billboards, användare och password history är nu borttagna!');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 