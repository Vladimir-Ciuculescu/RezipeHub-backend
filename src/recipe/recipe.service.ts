import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecipe(payload: CreateRecipeDto) {
    try {
      const { userId, title, servings, photoUrl, ingredients, steps } = payload;

      return await this.prismaService.$transaction(async (tsx) => {
        const newRecipe = await tsx.recipes.create({
          data: { title, userId, servings, photoUrl },
        });

        for (let ingredient of ingredients) {
          const newIngredient = await tsx.ingredients.create({
            data: ingredient,
          });

          await tsx.recipes_ingredients.create({
            data: { recipeId: newRecipe.id, ingredientId: newIngredient.id },
          });
        }

        const stepsPayload = steps.map((step) => ({
          recipeId: newRecipe.id,
          step: step.step,
          text: step.text,
        }));

        await tsx.steps.createMany({ data: stepsPayload });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
