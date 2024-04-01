/*
  Warnings:

  - You are about to drop the column `stripePriceId` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `Payments` table. All the data in the column will be lost.
  - The primary key for the `Stripe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `priceId` on the `Stripe` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Stripe` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productPriceId]` on the table `Stripe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscriptionPriceId]` on the table `Stripe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productPriceId` to the `Stripe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionPriceId` to the `Stripe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPriceId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionPriceId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Stripe_priceId_key";

-- AlterTable
ALTER TABLE "CurrentSubscription" ADD COLUMN     "customerId" TEXT;

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId",
ADD COLUMN     "productPriceId" TEXT,
ADD COLUMN     "subscriptionPriceId" TEXT;

-- AlterTable
ALTER TABLE "Stripe" DROP CONSTRAINT "Stripe_pkey",
DROP COLUMN "priceId",
DROP COLUMN "type",
ADD COLUMN     "productPriceId" TEXT NOT NULL,
ADD COLUMN     "subscriptionPriceId" TEXT NOT NULL,
ADD CONSTRAINT "Stripe_pkey" PRIMARY KEY ("productPriceId");

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "stripePriceId",
ADD COLUMN     "productPriceId" TEXT NOT NULL,
ADD COLUMN     "subscriptionPriceId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AllowedProducts";

-- CreateIndex
CREATE UNIQUE INDEX "Stripe_productPriceId_key" ON "Stripe"("productPriceId");

-- CreateIndex
CREATE UNIQUE INDEX "Stripe_subscriptionPriceId_key" ON "Stripe"("subscriptionPriceId");
