/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Payments_userId_key";

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "paymentId" SERIAL NOT NULL,
ADD CONSTRAINT "Payments_pkey" PRIMARY KEY ("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_paymentId_key" ON "Payments"("paymentId");
