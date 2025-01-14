/*
  Warnings:

  - You are about to drop the column `viewCount` on the `recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "viewCount",
ADD COLUMN     "view_count" INTEGER NOT NULL DEFAULT 0;
