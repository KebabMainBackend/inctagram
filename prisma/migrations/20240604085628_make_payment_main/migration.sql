/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subscriptionId]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_paymentId_fkey";

-- DropIndex
DROP INDEX "Subscription_paymentId_key";

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "subscriptionId" INTEGER;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "paymentId";

-- CreateIndex
CREATE UNIQUE INDEX "Payments_subscriptionId_key" ON "Payments"("subscriptionId");

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("subscriptionId") ON DELETE SET NULL ON UPDATE CASCADE;
