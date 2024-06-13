/*
  Warnings:

  - You are about to drop the column `banStatus` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BanStatus" AS ENUM ('BANNED', 'UNBANNED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "banStatus";

-- CreateTable
CREATE TABLE "Bans" (
    "userId" INTEGER NOT NULL,
    "banStatus" "BanStatus" NOT NULL DEFAULT 'UNBANNED',
    "banReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bans_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bans_userId_key" ON "Bans"("userId");

-- AddForeignKey
ALTER TABLE "Bans" ADD CONSTRAINT "Bans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
