import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CreateRecipeDto,
  EditRecipeDto,
  EditRecipePhotoDto,
  RecipesPerUserDto,
} from './dtos/recipe.dtos';
import { PrismaService } from 'prisma.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { UnitsService } from 'src/units/units.service';

@Injectable()
export class RecipeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ingredientsService: IngredientsService,
    private readonly unitsService: UnitsService,
  ) {}

  async getRecipesByUser(query: RecipesPerUserDto) {
    const { page, limit, userId } = query;

    try {
      const recipes = await this.prismaService.recipes.findMany({
        where: { userId },

        skip: page * limit,
        take: limit,
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
                          id: true,
                          quantity: true,
                          calories: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });

      const formattedRecipes = recipes.map((recipe) => {
        const newIngredients = recipe.ingredients.map((recipeIngredient) => {
          const ingredient = recipeIngredient.ingredient;

          const nutritionalInfo = ingredient.units
            .flatMap((unit) => unit.nutritionalInfo)
            .filter((info) => info.quantity !== undefined);

          return {
            id: ingredient.id,
            foodId: ingredient.foodId,

            quantity: nutritionalInfo[0]?.quantity || null,
            calories: nutritionalInfo[0]?.calories || null,
          };
        });

        const totalCalories = newIngredients.reduce((total, ingredient) => {
          const calories = Number(ingredient.calories) ?? 0; // Default to 0 if undefined or null

          return total + calories;
        }, 0);

        const { ingredients, ...formattedRecipe } = recipe;

        return {
          ...formattedRecipe,
          totalCalories,
        };
      });

      return formattedRecipes;
    } catch (error) {
      console.log(error);

      throw new BadGatewayException();
    }
  }

  async createRecipe(payload: CreateRecipeDto) {
    try {
      const {
        userId,
        title,
        servings,
        preparationTime,
        type,
        ingredients,
        steps,
      } = payload;

      return await this.prismaService.$transaction(async (tsx) => {
        const newRecipe = await tsx.recipes.create({
          data: {
            title,
            userId,
            servings,
            preparationTime,
            type,
          },
        });

        for (let ingredient of ingredients) {
          const { foodId, name, measures, calories, carbs, proteins, fats } =
            ingredient;

          const existingIngredient =
            await this.ingredientsService.getIngredient(foodId);

          let ingredientId;

          if (existingIngredient) {
            ingredientId = existingIngredient.id;
          } else {
            const payload = { foodId, name };
            const newIngredient =
              await this.ingredientsService.addIngredient(payload);
            ingredientId = newIngredient.id;
          }

          await tsx.recipes_ingredients.create({
            data: { recipeId: newRecipe.id, ingredientId },
          });

          for (let measure of measures) {
            const { uri, label, weight } = measure;

            let measureId;

            const payload = { uri, label };
            const existingMeasure = await this.unitsService.getUnit(payload);

            if (existingMeasure) {
              measureId = existingMeasure.id;
            } else {
              const newMeasure = await this.unitsService.addUnit(payload);
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
          }

          const currentUnit = await tsx.units.findUnique({
            where: { label: ingredient.unit },
          });

          const ingredientUnit = await tsx.ingredient_units.findFirst({
            where: {
              AND: [{ ingredientId: ingredientId, unitId: currentUnit.id }],
            },
          });

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
        { error: 'Could not create recipe !' },
        HttpStatus.CONFLICT,
      );
    }
  }

  async editRecipePhoto(payload: EditRecipePhotoDto) {
    const { id, photoUrl } = payload;

    await this.prismaService.recipes.update({
      where: { id },
      data: { photoUrl },
    });
  }

  async editRecipe(payload: EditRecipeDto) {
    const { recipe, ingredientsIds, nutritionalInfoIds, stepsIds } = payload;

    try {
      const {
        id,
        title,
        servings,
        photoUrl,
        ingredients,
        steps,
        type,
        preparationTime,
      } = recipe;

      return await this.prismaService.$transaction(async (tsx) => {
        await tsx.recipes.update({
          where: { id },
          data: { title, servings, photoUrl, type, preparationTime },
        });

        if (ingredientsIds) {
          await tsx.recipes_ingredients.deleteMany({
            where: {
              AND: [
                {
                  ingredientId: {
                    in: ingredientsIds,
                  },
                },
                { recipeId: id },
              ],
            },
          });
        }

        if (nutritionalInfoIds) {
          await tsx.ingredient_nutritional_info.deleteMany({
            where: {
              id: {
                in: nutritionalInfoIds,
              },
            },
          });
        }

        for (let ingredient of ingredients) {
          const { calories, carbs, proteins, fats, quantity } = ingredient;
          let nutritionalInfoId = ingredient.nutritionalInfoId;

          const unit = await tsx.units.findFirst({
            where: { label: ingredient.measure },
          });

          const ingredientUnit = await tsx.ingredient_units.findFirst({
            where: {
              AND: [{ ingredientId: ingredient.id }, { unitId: unit.id }],
            },
          });

          await tsx.ingredient_nutritional_info.update({
            where: { id: nutritionalInfoId },

            data: {
              calories,
              carbs,
              proteins,
              fats,
              quantity,
              ingredientUnitId: ingredientUnit.id,
            },
          });
        }

        if (stepsIds) {
          await tsx.steps.deleteMany({
            where: { AND: [{ id: { in: stepsIds } }, { recipeId: recipe.id }] },
          });
        }

        for (let step of steps) {
          await tsx.steps.update({
            where: { id: step.id },
            data: { text: step.description },
          });
        }
      });
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.CONFLICT);
      console.log(error);
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
                        id: true,
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
      preparationTime: recipe.preparationTime,
      type: recipe.type,
      ingredients: recipe.ingredients.map((recipeIngredient) => {
        const ingredient = recipeIngredient.ingredient;

        const primaryUnitInfo = ingredient.units.find(
          (unit) => unit.nutritionalInfo.length > 0,
        );

        const nutritionalInfo = ingredient.units
          .flatMap((unit) => unit.nutritionalInfo)
          .filter((info) => info.quantity !== undefined);

        const allUnits = ingredient.units.map((unit) => ({
          label: unit.unit.label,
          uri: unit.unit.uri,
        }));

        return {
          id: ingredient.id,
          foodId: ingredient.foodId,
          name: ingredient.name,
          unit: primaryUnitInfo?.unit.label || null,
          allUnits,

          nutritionalInfoId: nutritionalInfo[0].id,
          quantity: nutritionalInfo[0]?.quantity || null,
          calories: nutritionalInfo[0]?.calories
            ? nutritionalInfo[0]?.calories.toNumber()
            : null,
          carbs: nutritionalInfo[0]?.carbs
            ? nutritionalInfo[0].carbs.toNumber()
            : null,
          proteins: nutritionalInfo[0]?.proteins
            ? nutritionalInfo[0]?.proteins.toNumber()
            : null,
          fats: nutritionalInfo[0]?.fats
            ? nutritionalInfo[0]?.fats.toNumber()
            : null,
        };
      }),
      steps: recipe.steps,
    };

    return formattedRecipe;
  }
}
