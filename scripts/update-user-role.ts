import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateUserRole() {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: 'philipson@par.se' },
      data: { role: 'ANNONSOR' },
    });

    console.log('Successfully updated user role:', updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateUserRole(); 