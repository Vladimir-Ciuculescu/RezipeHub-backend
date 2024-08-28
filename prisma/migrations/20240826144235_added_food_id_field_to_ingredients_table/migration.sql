/*
  Warnings:

  - Added the required column `food_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "food_id" TEXT NOT NULL;
