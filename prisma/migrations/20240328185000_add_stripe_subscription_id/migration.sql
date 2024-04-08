/*
  Warnings:

  - The primary key for the `Stripe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `Stripe` table. All the data in the column will be lost.
  - Added the required column `stripeSubscriptionId` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionId` to the `Stripe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSubscriptionId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Stripe_productId_key";

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "stripeSubscriptionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stripe" DROP CONSTRAINT "Stripe_pkey",
DROP COLUMN "productId",
ADD COLUMN     "subscriptionId" TEXT NOT NULL,
ADD CONSTRAINT "Stripe_pkey" PRIMARY KEY ("priceId");

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "stripeSubscriptionId" TEXT NOT NULL;
