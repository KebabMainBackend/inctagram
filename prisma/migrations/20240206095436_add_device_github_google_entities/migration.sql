/*
  Warnings:

  - The primary key for the `Devices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `Devices` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Devices" DROP CONSTRAINT "Devices_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Devices_pkey" PRIMARY KEY ("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Devices_deviceId_key" ON "Devices"("deviceId");
