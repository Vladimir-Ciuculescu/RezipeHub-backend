-- CreateTable
CREATE TABLE "users_favorites" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "users_favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_favorites" ADD CONSTRAINT "users_favorites_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_favorites" ADD CONSTRAINT "users_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
