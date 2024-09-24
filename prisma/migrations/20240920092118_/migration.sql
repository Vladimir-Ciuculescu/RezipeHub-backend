/*
  Warnings:

  - You are about to alter the column `calories` on the `recipes_ingredients` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "recipes_ingredients" ALTER COLUMN "calories" DROP DEFAULT,
ALTER COLUMN "calories" SET DATA TYPE DOUBLE PRECISION;
