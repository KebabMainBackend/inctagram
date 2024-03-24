/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `expireAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "expiredAt",
ADD COLUMN     "expireAt" TIMESTAMP(3) NOT NULL;
