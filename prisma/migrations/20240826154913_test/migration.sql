/*
  Warnings:

  - You are about to drop the column `unitId` on the `ingredients_measures` table. All the data in the column will be lost.
  - Added the required column `measureId` to the `ingredients_measures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredients_measures" DROP CONSTRAINT "ingredients_measures_unitId_fkey";

-- AlterTable
ALTER TABLE "ingredients_measures" DROP COLUMN "unitId",
ADD COLUMN     "measureId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ingredients_measures" ADD CONSTRAINT "ingredients_measures_measureId_fkey" FOREIGN KEY ("measureId") REFERENCES "measures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
