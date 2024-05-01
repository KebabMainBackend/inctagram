-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "Devices" ADD CONSTRAINT "Devices_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
