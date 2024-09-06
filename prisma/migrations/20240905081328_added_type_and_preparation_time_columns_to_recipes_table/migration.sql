/*
  Warnings:

  - Added the required column `preparation_time` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "recipe_type" AS ENUM ('PIZZA', 'HAMBURGER', 'ASIATIC', 'BURRITO', 'NOODLES', 'PASTA', 'SEA_FOOD', 'BARBECUE', 'FISH', 'SALAD', 'APPETIZER', 'KEBAB', 'SUSHI', 'BRUNCH', 'SANDWICH', 'COFFEE', 'TACO', 'VEGETARIAN', 'VEGAN', 'OTHER');

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "preparation_time" INTEGER NOT NULL,
ADD COLUMN     "type" "recipe_type" NOT NULL;
