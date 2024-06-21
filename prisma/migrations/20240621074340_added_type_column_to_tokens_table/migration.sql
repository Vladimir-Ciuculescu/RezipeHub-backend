/*
  Warnings:

  - Added the required column `type` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "token_type" AS ENUM ('ACCOUNT_VERIFICATION', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "type" "token_type" NOT NULL;
