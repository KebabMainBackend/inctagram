/*
  Warnings:

  - You are about to drop the column `dateOfPayments` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Stripe` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Stripe` table. All the data in the column will be lost.
  - You are about to drop the column `expireAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionType` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subscriptionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Made the column `stripePriceId` on table `Payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripeProductId` on table `Payments` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `period` to the `Stripe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interval` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Made the column `stripePriceId` on table `Subscription` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripeProductId` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentInterval" AS ENUM ('day', 'week', 'month', 'year');

-- DropIndex
DROP INDEX "Subscription_userId_key";

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "dateOfPayments",
DROP COLUMN "paymentType",
ADD COLUMN     "dateOfPayment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentSystem" "AllowedPaymentTypes" NOT NULL DEFAULT 'PayPall',
ALTER COLUMN "stripePriceId" SET NOT NULL,
ALTER COLUMN "stripeProductId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Stripe" DROP COLUMN "category",
DROP COLUMN "type",
ADD COLUMN     "period" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "expireAt",
DROP COLUMN "paymentType",
DROP COLUMN "subscriptionType",
ADD COLUMN     "interval" "PaymentInterval" NOT NULL,
ADD COLUMN     "paymentSystem" "AllowedPaymentTypes" NOT NULL DEFAULT 'PayPall',
ADD COLUMN     "period" INTEGER NOT NULL,
ADD COLUMN     "subscriptionId" SERIAL NOT NULL,
ALTER COLUMN "stripePriceId" SET NOT NULL,
ALTER COLUMN "stripeProductId" SET NOT NULL,
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscriptionId");

-- CreateTable
CREATE TABLE "CurrentSubscription" (
    "userId" INTEGER NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "dateOfNextPayment" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentSubscription_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrentSubscription_userId_key" ON "CurrentSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_subscriptionId_key" ON "Subscription"("subscriptionId");

-- AddForeignKey
ALTER TABLE "CurrentSubscription" ADD CONSTRAINT "CurrentSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
