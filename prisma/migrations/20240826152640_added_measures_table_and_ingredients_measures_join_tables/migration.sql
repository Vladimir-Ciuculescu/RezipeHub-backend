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
