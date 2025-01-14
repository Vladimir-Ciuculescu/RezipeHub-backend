/*
  Warnings:

  - You are about to drop the `ingredients_measures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `measures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ingredients_measures" DROP CONSTRAINT "ingredients_measures_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_measures" DROP CONSTRAINT "ingredients_measures_measureId_fkey";

-- DropTable
DROP TABLE "ingredients_measures";

-- DropTable
DROP TABLE "measures";

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients_units" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "ingredients_units_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredients_units" ADD CONSTRAINT "ingredients_units_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_units" ADD CONSTRAINT "ingredients_units_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;
