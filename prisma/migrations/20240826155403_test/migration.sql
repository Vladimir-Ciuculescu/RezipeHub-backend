/*
  Warnings:

  - You are about to drop the column `food_id` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the `ingredients_measures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `measures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ingredients_measures" DROP CONSTRAINT "ingredients_measures_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_measures" DROP CONSTRAINT "ingredients_measures_measureId_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "food_id";

-- DropTable
DROP TABLE "ingredients_measures";

-- DropTable
DROP TABLE "measures";
