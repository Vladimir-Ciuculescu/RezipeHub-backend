import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
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
        orderBy: {
          id: 'desc',
        },
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
          const {
            foodId,
            name,
            measures,
            quantity,
            calories,
            carbs,
            proteins,
            fats,
          } = ingredient;

          const existingIngredient = await tsx.ingredients.findUnique({
            where: { foodId },
          });

          let ingredientId;

          if (existingIngredient) {
            ingredientId = existingIngredient.id;
          } else {
            const newIngredient = await tsx.ingredients.create({
              data: { foodId, name },
            });
            ingredientId = newIngredient.id;
          }

          await tsx.recipes_ingredients.create({
            data: { recipeId: newRecipe.id, ingredientId },
          });

          for (let measure of measures) {
            const { uri, label, weight } = measure;

            let measureId;

            const existingMeasure = await tsx.units.findFirst({
              where: { AND: [{ uri }, { label }] },
            });

            if (existingMeasure) {
              measureId = existingMeasure.id;
            } else {
              const newMeasure = await tsx.units.create({
                data: { uri, label },
              });
              measureId = newMeasure.id;
            }

            const existentIngredientUnit = await tsx.ingredient_units.findFirst(
              { where: { AND: [{ ingredientId }, { unitId: measureId }] } },
            );

            if (!existentIngredientUnit) {
              await tsx.ingredient_units.create({
                data: {
                  ingredientId: ingredientId,
                  unitId: measureId,
                  weight,
                },
              });
            }

            // const newIngredientUnit = await tsx.ingredient_units.create({
            //   data: {
            //     ingredientId: ingredientId,
            //     unitId: measureId,
            //     weight,
            //   },
            // });

            // if (!nutritionalInfoCreated) {
            //   await tsx.ingredient_nutritional_info.upsert({
            //     where: {
            //       ingredientUnitId: newIngredientUnit.id,
            //     },

            //     update: {
            //       quantity,
            //       calories,
            //       fats,
            //       carbs,
            //       proteins,
            //     },
            //     create: {
            //       quantity,
            //       calories,
            //       fats,
            //       carbs,
            //       proteins,
            //       ingredientUnitId: newIngredientUnit.id,
            //     },
            //   });
            //   nutritionalInfoCreated = true;
            // }
          }

          const currentUnit = await tsx.units.findUnique({
            where: { label: ingredient.unit },
          });

          const ingredientUnit = await tsx.ingredient_units.findFirst({
            where: {
              AND: [{ ingredientId: ingredientId, unitId: currentUnit.id }],
            },
          });

          // const existentIngredientNutritionalInfo =
          //   await tsx.ingredient_nutritional_info.findUnique({
          //     where: { ingredientUnitId: ingredientUnit.id },
          //   });

          // if (!existentIngredientNutritionalInfo) {
          //   await tsx.ingredient_nutritional_info.create({
          //     data: {
          //       ingredientUnitId: ingredientUnit.id,
          //       quantity: ingredient.quantity,
          //       calories,
          //       carbs,
          //       proteins,
          //       fats,
          //     },
          //   });
          // }
          await tsx.ingredient_nutritional_info.create({
            data: {
              ingredientUnitId: ingredientUnit.id,
              quantity: ingredient.quantity,
              calories,
              carbs,
              proteins,
              fats,
            },
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

      throw new HttpException(
        { error: 'Token not valid or expired' },
        HttpStatus.CONFLICT,
      );
    }
  }

  async getRecipe(id) {
    const recipe = await this.prismaService.recipes.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: {
              include: {
                units: {
                  include: {
                    unit: true,
                    nutritionalInfo: {
                      select: {
                        quantity: true,
                        calories: true,
                        carbs: true,
                        proteins: true,
                        fats: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        steps: true,
      },
    });

    if (!recipe) {
      throw new HttpException(
        { error: 'Recipe not found !' },
        HttpStatus.NOT_FOUND,
      );
    }

    const formattedRecipe = {
      id: recipe.id,
      userId: recipe.userId,
      title: recipe.title,
      servings: recipe.servings,
      photoUrl: recipe.photoUrl,
      ingredients: recipe.ingredients.map((recipeIngredient) => {
        const ingredient = recipeIngredient.ingredient;

        const primaryUnitInfo = ingredient.units.find(
          (unit) => unit.nutritionalInfo.length > 0,
        );

        const nutritionalInfo = ingredient.units
          .flatMap((unit) => unit.nutritionalInfo)
          .filter((info) => info.quantity !== undefined);

        return {
          id: ingredient.id,
          foodId: ingredient.foodId,
          name: ingredient.name,
          unit: primaryUnitInfo?.unit.label || null,
          quantity: nutritionalInfo[0]?.quantity || null,
          calories: nutritionalInfo[0]?.calories || null,
          carbs: nutritionalInfo[0]?.carbs || null,
          proteins: nutritionalInfo[0]?.proteins || null,
          fats: nutritionalInfo[0]?.fats || null,
        };
      }),
      steps: recipe.steps,
    };

    return formattedRecipe;
  }
}
