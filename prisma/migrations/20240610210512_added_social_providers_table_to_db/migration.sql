-- CreateEnum
CREATE TYPE "SocialProviderEnum" AS ENUM ('GOOGLE', 'FACEBOOK');

-- CreateTable
CREATE TABLE "SocialProvider" (
    "id" SERIAL NOT NULL,
    "provider" "SocialProviderEnum" NOT NULL,
    "provider_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "SocialProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialProvider_provider_provider_id_key" ON "SocialProvider"("provider", "provider_id");

-- AddForeignKey
ALTER TABLE "SocialProvider" ADD CONSTRAINT "SocialProvider_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
