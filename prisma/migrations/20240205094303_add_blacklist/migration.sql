-- CreateTable
CREATE TABLE "Blacklist" (
    "refreshToken" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Blacklist_refreshToken_key" ON "Blacklist"("refreshToken");
