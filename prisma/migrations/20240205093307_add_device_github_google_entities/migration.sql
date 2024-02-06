-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubProviderId" INTEGER,
ADD COLUMN     "googleProviderId" INTEGER,
ALTER COLUMN "passwordHash" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Devices" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "lastActiveDate" TIMESTAMP(3) NOT NULL,
    "aliveTill" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Github" (
    "providerId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Github_pkey" PRIMARY KEY ("providerId")
);

-- CreateTable
CREATE TABLE "Google" (
    "providerId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Google_pkey" PRIMARY KEY ("providerId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_githubProviderId_fkey" FOREIGN KEY ("githubProviderId") REFERENCES "Github"("providerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_googleProviderId_fkey" FOREIGN KEY ("googleProviderId") REFERENCES "Google"("providerId") ON DELETE SET NULL ON UPDATE CASCADE;
