/*
  Warnings:

  - You are about to drop the column `emailConfirmed` on the `User` table. All the data in the column will be lost.
  - Added the required column `codeExpirationDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmationCode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailConfirmed",
ADD COLUMN     "codeExpirationDate" TEXT NOT NULL,
ADD COLUMN     "confirmationCode" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
