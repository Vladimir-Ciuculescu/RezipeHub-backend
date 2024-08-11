import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRecipeDto, RecipesPerUserDto } from './dtos/recipe.dtos';
import { PrismaService } from 'prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRecipesByUser(query: RecipesPerUserDto) {
    const { page, limit, userId } = query;

    try {
      const recipes = await this.prismaService.recipes.findMany({
        where: { userId },
        skip: page * limit,
        take: limit,
      });
      return recipes;
    } catch (error) {
      console.log(error);

      throw new BadGatewayException();
    }
  }

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

        return newRecipe;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getRecipe(id) {
    try {
      const recipe = await this.prismaService.recipes.findUnique({
        where: { id },
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
          steps: true,
        },
      });

      const flattenedIngredients = recipe.ingredients.map((item) => ({
        id: item.ingredient.id,
        name: item.ingredient.name,
        unit: item.ingredient.unit,
        quantity: item.ingredient.quantity,
        calories: item.ingredient.calories,
        carbs: item.ingredient.carbs,
        proteins: item.ingredient.proteins,
        fats: item.ingredient.fats,
      }));

      const flattenedSteps = recipe.steps.map((step) => ({
        id: step.id,
        step: step.step,
        text: step.text,
      }));

      return {
        ...recipe,
        ingredients: flattenedIngredients,
        steps: flattenedSteps,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
