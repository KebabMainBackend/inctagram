/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentType" TEXT NOT NULL DEFAULT 'PayPall';
