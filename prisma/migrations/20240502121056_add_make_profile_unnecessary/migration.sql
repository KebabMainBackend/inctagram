-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_profileUserId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "profileUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
