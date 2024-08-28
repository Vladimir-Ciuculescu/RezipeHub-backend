/*
  Warnings:

  - A unique constraint covering the columns `[ingredientUnitId]` on the table `ingredient_nutritional_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ingredient_nutritional_info_ingredientUnitId_key" ON "ingredient_nutritional_info"("ingredientUnitId");
