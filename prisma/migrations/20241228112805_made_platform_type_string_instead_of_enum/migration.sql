/*
  Warnings:

  - Changed the type of `deviceType` on the `user_devices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user_devices" DROP COLUMN "deviceType",
ADD COLUMN     "deviceType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "platform";
