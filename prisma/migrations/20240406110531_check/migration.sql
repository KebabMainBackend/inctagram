/*
  Warnings:

  - The `accountType` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('BUSINESS', 'PERSONAL');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "accountType",
ADD COLUMN     "accountType" "AccountType" DEFAULT 'PERSONAL';
