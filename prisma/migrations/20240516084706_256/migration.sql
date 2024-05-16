/*
  Warnings:

  - You are about to alter the column `refresh_token` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(512)` to `VarChar(256)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "refresh_token" SET DATA TYPE VARCHAR(256);
