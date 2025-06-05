// Usage: npx tsx scripts/set-user-role.ts <email> <role>
// Example: npx tsx scripts/set-user-role.ts test@example.com uthyrare

import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const role = process.argv[3];
  if (!email || !role || !['uthyrare', 'annonsor'].includes(role)) {
    console.error('Usage: npx tsx scripts/set-user-role.ts <email> <uthyrare|annonsor>');
    process.exit(1);
  }

  const userRole = role === 'uthyrare' ? UserRole.UTHYRARE : UserRole.ANNONSOR;

  const user = await prisma.user.update({
    where: { email },
    data: { role: userRole },
  });
  console.log(`Uppdaterade ${email} till ${userRole}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 