/*
  Warnings:

  - You are about to alter the column `quantity` on the `recipes_ingredients` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "recipes_ingredients" ALTER COLUMN "calories" SET DEFAULT 0.00,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
