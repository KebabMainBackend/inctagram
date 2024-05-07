/*
  Warnings:

  - You are about to drop the column `deviceId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `profileUserId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[devicesId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `devicesId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Devices" DROP CONSTRAINT "Devices_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_profileUserId_fkey";

-- DropIndex
DROP INDEX "Devices_sessionId_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "deviceId",
ADD COLUMN     "devicesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "profileUserId";

-- CreateIndex
CREATE UNIQUE INDEX "Session_devicesId_key" ON "Session"("devicesId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_devicesId_fkey" FOREIGN KEY ("devicesId") REFERENCES "Devices"("deviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
