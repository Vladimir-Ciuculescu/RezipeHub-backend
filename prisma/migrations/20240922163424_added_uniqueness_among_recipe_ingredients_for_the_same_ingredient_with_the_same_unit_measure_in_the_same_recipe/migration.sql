/*
  Warnings:

  - A unique constraint covering the columns `[recipe_id,unit_id,ingredient_id]` on the table `recipes_ingredients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipes_ingredients_recipe_id_unit_id_ingredient_id_key" ON "recipes_ingredients"("recipe_id", "unit_id", "ingredient_id");
