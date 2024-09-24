/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `recipes_ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `recipes_ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `steps` table. All the data in the column will be lost.
  - You are about to drop the `ingredient_nutritional_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredient_units` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingreidient_id` to the `recipes_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `recipes_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `recipes_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `recipes_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `steps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredient_nutritional_info" DROP CONSTRAINT "ingredient_nutritional_info_ingredientUnitId_fkey";

-- DropForeignKey
ALTER TABLE "ingredient_units" DROP CONSTRAINT "ingredient_units_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredient_units" DROP CONSTRAINT "ingredient_units_unitId_fkey";

-- DropForeignKey
ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "recipes_ingredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "recipes_ingredients_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_recipeId_fkey";

-- AlterTable
ALTER TABLE "recipes_ingredients" DROP COLUMN "ingredientId",
DROP COLUMN "recipeId",
ADD COLUMN     "calories" DECIMAL(10,2),
ADD COLUMN     "carbs" DECIMAL(10,2),
ADD COLUMN     "fats" DECIMAL(10,2),
ADD COLUMN     "ingreidient_id" INTEGER NOT NULL,
ADD COLUMN     "proteins" DECIMAL(10,2),
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "recipe_id" INTEGER NOT NULL,
ADD COLUMN     "unit_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "steps" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ingredient_nutritional_info";

-- DropTable
DROP TABLE "ingredient_units";

-- AddForeignKey
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_ingreidient_id_fkey" FOREIGN KEY ("ingreidient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
