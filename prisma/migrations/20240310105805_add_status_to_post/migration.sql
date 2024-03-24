-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('ACTIVE', 'DELETED', 'BLOCKED');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'ACTIVE',
    "images" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT,
    "passwordSalt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "providerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" INTEGER NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "birthDate" TEXT,
    "aboutMe" TEXT,
    "avatarId" TEXT,
    "thumbnailId" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserConfirmation" (
    "id" SERIAL NOT NULL,
    "confirmationCode" TEXT NOT NULL,
    "codeExpirationDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "lastActiveDate" TIMESTAMP(3) NOT NULL,
    "aliveTill" TIMESTAMP(3) NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devices" (
    "title" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Devices_pkey" PRIMARY KEY ("deviceId")
);

-- CreateTable
CREATE TABLE "OAuthProvider" (
    "id" SERIAL NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "email" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OAuthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blacklist" (
    "refreshToken" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserConfirmation_id_key" ON "UserConfirmation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserConfirmation_userId_key" ON "UserConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Devices_deviceId_key" ON "Devices"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Devices_sessionId_key" ON "Devices"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthProvider_id_key" ON "OAuthProvider"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Blacklist_refreshToken_key" ON "Blacklist"("refreshToken");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConfirmation" ADD CONSTRAINT "UserConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Devices"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthProvider" ADD CONSTRAINT "OAuthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
