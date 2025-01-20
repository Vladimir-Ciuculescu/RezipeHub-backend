/*
  Warnings:

  - You are about to drop the column `notificationsEnabled` on the `user_devices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_devices" DROP COLUMN "notificationsEnabled",
ADD COLUMN     "notifications_enabled" BOOLEAN NOT NULL DEFAULT true;
