/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_userId_fkey";

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "photoUrl",
DROP COLUMN "userId",
ADD COLUMN     "photo_url" TEXT,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
