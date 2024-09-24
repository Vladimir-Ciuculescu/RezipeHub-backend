/*
  Warnings:

  - You are about to drop the column `ingreidient_id` on the `recipes_ingredients` table. All the data in the column will be lost.
  - Added the required column `ingredient_id` to the `recipes_ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "recipes_ingredients_ingreidient_id_fkey";

-- AlterTable
ALTER TABLE "recipes_ingredients" DROP COLUMN "ingreidient_id",
ADD COLUMN     "ingredient_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
