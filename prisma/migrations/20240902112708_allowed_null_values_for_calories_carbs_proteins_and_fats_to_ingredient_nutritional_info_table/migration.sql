-- AlterTable
ALTER TABLE "ingredient_nutritional_info" ALTER COLUMN "calories" DROP NOT NULL,
ALTER COLUMN "carbs" DROP NOT NULL,
ALTER COLUMN "proteins" DROP NOT NULL,
ALTER COLUMN "fats" DROP NOT NULL;
