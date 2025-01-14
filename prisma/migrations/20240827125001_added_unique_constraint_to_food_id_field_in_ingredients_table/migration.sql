/*
  Warnings:

  - A unique constraint covering the columns `[food_id]` on the table `ingredients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ingredients_food_id_key" ON "ingredients"("food_id");
