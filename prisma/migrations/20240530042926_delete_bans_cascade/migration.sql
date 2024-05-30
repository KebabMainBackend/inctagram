-- DropForeignKey
ALTER TABLE "Bans" DROP CONSTRAINT "Bans_userId_fkey";

-- AddForeignKey
ALTER TABLE "Bans" ADD CONSTRAINT "Bans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
