/*
  Warnings:

  - You are about to drop the column `calories` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `fats` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `proteins` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the `ingredients_measures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `measures` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `food_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredients_measures" DROP CONSTRAINT "ingredients_measures_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_measures" DROP CONSTRAINT "ingredients_measures_measureId_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "calories",
DROP COLUMN "carbs",
DROP COLUMN "fats",
DROP COLUMN "proteins",
DROP COLUMN "quantity",
ADD COLUMN     "food_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ingredients_measures";

-- DropTable
DROP TABLE "measures";

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_units" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ingredient_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_nutritional_info" (
    "id" SERIAL NOT NULL,
    "ingredientUnitId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "proteins" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ingredient_nutritional_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_uri_key" ON "units"("uri");

-- AddForeignKey
ALTER TABLE "ingredient_units" ADD CONSTRAINT "ingredient_units_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_units" ADD CONSTRAINT "ingredient_units_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_nutritional_info" ADD CONSTRAINT "ingredient_nutritional_info_ingredientUnitId_fkey" FOREIGN KEY ("ingredientUnitId") REFERENCES "ingredient_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;
