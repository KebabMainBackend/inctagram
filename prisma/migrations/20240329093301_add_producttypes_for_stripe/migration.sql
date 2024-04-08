/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Stripe` table. All the data in the column will be lost.
  - Added the required column `type` to the `Stripe` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AllowedProducts" AS ENUM ('Product', 'Subscription');

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Stripe" DROP COLUMN "subscriptionId",
ADD COLUMN     "type" "AllowedProducts" NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL;
