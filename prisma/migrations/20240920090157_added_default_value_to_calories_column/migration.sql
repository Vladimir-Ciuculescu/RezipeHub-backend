/*
  Warnings:

  - Made the column `calories` on table `recipes_ingredients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recipes_ingredients" ALTER COLUMN "calories" SET NOT NULL,
ALTER COLUMN "calories" SET DEFAULT 0.00;
