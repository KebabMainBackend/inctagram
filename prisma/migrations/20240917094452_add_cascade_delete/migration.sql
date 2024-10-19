-- DropForeignKey
ALTER TABLE "ChatMember" DROP CONSTRAINT "ChatMember_chatId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "imgUrl" DROP NOT NULL,
ALTER COLUMN "voiceUrl" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
