/*
  Warnings:

  - You are about to alter the column `quantity` on the `recipes_ingredients` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "recipes_ingredients" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(10,2);
