/*
  Warnings:

  - You are about to alter the column `calories` on the `ingredient_nutritional_info` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `carbs` on the `ingredient_nutritional_info` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `proteins` on the `ingredient_nutritional_info` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `fats` on the `ingredient_nutritional_info` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "ingredient_nutritional_info" ALTER COLUMN "calories" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "carbs" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "proteins" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "fats" SET DATA TYPE DECIMAL(10,2);
