/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Guest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "updatedAt",
ADD COLUMN     "blastedAt" TIMESTAMP(3);
