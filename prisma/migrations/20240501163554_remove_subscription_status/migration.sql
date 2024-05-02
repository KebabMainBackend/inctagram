/*
  Warnings:

  - You are about to drop the column `subscriptionStatus` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "subscriptionStatus";

-- DropEnum
DROP TYPE "SubscriptionStatus";
