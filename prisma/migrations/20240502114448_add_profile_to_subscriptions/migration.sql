/*
  Warnings:

  - You are about to drop the column `subscriptionStatus` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `profileUserId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "subscriptionStatus",
ADD COLUMN     "profileUserId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "SubscriptionStatus";

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
