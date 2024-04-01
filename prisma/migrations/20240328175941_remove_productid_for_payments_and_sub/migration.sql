/*
  Warnings:

  - You are about to drop the column `stripeProductId` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `stripeProductId` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "stripeProductId";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "stripeProductId";
