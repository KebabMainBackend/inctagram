/*
  Warnings:

  - Changed the type of `codeExpirationDate` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "codeExpirationDate",
ADD COLUMN     "codeExpirationDate" TIMESTAMP(3) NOT NULL;
