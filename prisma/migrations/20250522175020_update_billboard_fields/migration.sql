/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Billboard` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Billboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billboard" DROP COLUMN "imageUrl",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "availableFrom" TIMESTAMP(3),
ADD COLUMN     "availableTo" TIMESTAMP(3),
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ledig',
ADD COLUMN     "traffic" INTEGER,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
