-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('Confirmed', 'Pending');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "SubscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'Confirmed';
