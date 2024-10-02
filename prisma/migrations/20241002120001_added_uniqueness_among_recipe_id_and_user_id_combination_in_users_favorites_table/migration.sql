/*
  Warnings:

  - A unique constraint covering the columns `[recipe_id,user_id]` on the table `users_favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_favorites_recipe_id_user_id_key" ON "users_favorites"("recipe_id", "user_id");
