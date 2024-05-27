/*
  Warnings:

  - You are about to drop the column `userPhotos` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurrentSubscription" DROP CONSTRAINT "CurrentSubscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "OAuthProvider" DROP CONSTRAINT "OAuthProvider_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "userPhotos",
DROP COLUMN "username";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthProvider" ADD CONSTRAINT "OAuthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentSubscription" ADD CONSTRAINT "CurrentSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
