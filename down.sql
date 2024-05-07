-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_devicesId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropIndex
DROP INDEX "Session_devicesId_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "devicesId",
ADD COLUMN     "deviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "profileUserId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Devices_sessionId_key" ON "Devices"("sessionId" ASC);

-- AddForeignKey
ALTER TABLE "Devices" ADD CONSTRAINT "Devices_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "Profile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

