/*
  Warnings:

  - You are about to drop the `ingredients_units` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `units` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unit` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredients_units" DROP CONSTRAINT "ingredients_units_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_units" DROP CONSTRAINT "ingredients_units_unitId_fkey";

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "unit" TEXT NOT NULL;

-- DropTable
DROP TABLE "ingredients_units";

-- DropTable
DROP TABLE "units";

-- CreateTable
CREATE TABLE "measures" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients_measures" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "ingredients_measures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredients_measures" ADD CONSTRAINT "ingredients_measures_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_measures" ADD CONSTRAINT "ingredients_measures_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "measures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
