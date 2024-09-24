/*
  Warnings:

  - A unique constraint covering the columns `[ingredientId,unitId]` on the table `ingredient_units` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ingredient_units_ingredientId_unitId_key" ON "ingredient_units"("ingredientId", "unitId");
