"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const ingredients_service_1 = require("../ingredients/ingredients.service");
const units_service_1 = require("../units/units.service");
let RecipeService = class RecipeService {
    constructor(prismaService, ingredientsService, unitsService) {
        this.prismaService = prismaService;
        this.ingredientsService = ingredientsService;
        this.unitsService = unitsService;
    }
    async getLatestRecipes(query) {
        const { userId, page, limit } = query;
        try {
            const latestRecipes = await this.prismaService.recipes.findMany({
                where: {
                    userId: {
                        not: userId,
                    },
                },
                select: {
                    id: true,
                    title: true,
                    photoUrl: true,
                    preparationTime: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            photoUrl: true,
                        },
                    },
                    user_favorites: {
                        where: {
                            userId: query.userId,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: limit * page,
                take: limit,
            });
            const transformedRecipes = latestRecipes.map((recipe) => {
                const { user_favorites, ...rest } = recipe;
                return {
                    ...rest,
                    isInFavorites: recipe.user_favorites.length > 0,
                };
            });
            return transformedRecipes;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
    async getMostPopularRecipes(query) {
        const { userId, page, limit } = query;
        try {
            const mostPopularRecipes = await this.prismaService.recipes.findMany({
                where: {
                    userId: {
                        not: userId,
                    },
                },
                select: {
                    id: true,
                    title: true,
                    photoUrl: true,
                    preparationTime: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            photoUrl: true,
                        },
                    },
                    user_favorites: {
                        where: {
                            userId: query.userId,
                        },
                    },
                },
                orderBy: [
                    { viewCount: "desc" },
                    {
                        user_favorites: { _count: "desc" },
                    },
                ],
                skip: limit * page,
                take: limit,
            });
            return mostPopularRecipes;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
    async getRecipesByCategory(query) {
        const { userId, category, limit, page } = query;
        try {
            const recipes = await this.prismaService.recipes.findMany({
                where: {
                    AND: [{ userId: { not: userId } }, { type: category }],
                },
                select: {
                    id: true,
                    title: true,
                    photoUrl: true,
                    preparationTime: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            photoUrl: true,
                        },
                    },
                    user_favorites: {
                        where: {
                            userId: query.userId,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: limit * page,
                take: limit,
            });
            return recipes;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
    async getRecipes(query) {
        const { title, categories, caloriesRange, preparationTimeRange, page, limit, userId } = query;
        const baseQuery = `
      SELECT 
        r.id,
        r.title AS title,
        r.photo_url AS "photoUrl",
        r."preparation_time" AS "preparationTime",
        CAST(ROUND(SUM(ri.calories::numeric), 2) AS float8) AS "totalCalories",
        json_build_object(
          'id', u.id,
          'firstName', u.first_name,
          'lastName', u.last_name,
          'photoUrl', u.photo_url
        ) AS user
      FROM 
        recipes r
      JOIN 
        recipes_ingredients ri ON r.id = ri.recipe_id
      JOIN
        users u ON r.user_id = u.id
    `;
        const conditions = [];
        const havingConditions = [];
        if (title) {
            conditions.push(`r.title ILIKE '%' || '${title}' || '%'`);
        }
        if (categories && categories.length > 0) {
            const formattedCategories = categories.map((category) => `'${category}'`).join(", ");
            conditions.push(`r.type IN (${formattedCategories})`);
        }
        if (caloriesRange && caloriesRange.length === 2) {
            havingConditions.push(`SUM(ri.calories) BETWEEN ${caloriesRange[0]} AND ${caloriesRange[1]}`);
        }
        if (preparationTimeRange && preparationTimeRange.length === 2) {
            conditions.push(`r."preparation_time" BETWEEN ${preparationTimeRange[0]} AND ${preparationTimeRange[1]}`);
        }
        const finalQuery = `
      ${baseQuery}
      WHERE ${conditions.length > 0 ? conditions.join(" AND ") : "TRUE"}
      AND r.user_id != ${userId}
      GROUP BY 
        r.id, r.title, u.id, u.first_name, u.last_name, u.photo_url
      HAVING ${havingConditions.length > 0 ? havingConditions.join(" AND ") : "TRUE"}
      ORDER BY r.created_at DESC
      LIMIT ${limit}
      OFFSET ${limit * page}
      ;
    `;
        const recipes = await this.prismaService.$queryRawUnsafe(finalQuery);
        return recipes;
    }
    async getRecipesByUser(query) {
        const { page, limit, userId } = query;
        try {
            const recipes = await this.prismaService
                .$queryRaw `SELECT r.id, r.title, r.servings, r."photo_url" AS "photoUrl", r.type, r."preparation_time" AS "preparationTime", CAST(ROUND(SUM(ri.calories::numeric), 2) AS float8) AS "totalCalories"
      FROM recipes r
      JOIN recipes_ingredients ri ON r.id = ri."recipe_id"
      WHERE r."user_id" = ${userId}
      GROUP BY r.id, r.title, r.servings, r.type, r."preparation_time" 
      ORDER BY r."created_at" DESC
      OFFSET ${page * limit} ROWS 
      FETCH NEXT ${limit} ROWS only;`;
            return recipes;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
    async createRecipe(payload) {
        const { userId, title, servings, preparationTime, type, ingredients, steps } = payload;
        try {
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
                    const { foodId, name, measures, unit, calories, carbs, proteins, fats } = ingredient;
                    const existentIngredient = await this.ingredientsService.getIngredient(foodId);
                    let ingredientId;
                    if (existentIngredient) {
                        ingredientId = existentIngredient.id;
                    }
                    else {
                        const payload = {
                            foodId,
                            name,
                        };
                        const newIngredient = await this.ingredientsService.addIngredient(payload);
                        ingredientId = newIngredient.id;
                    }
                    for (let measure of measures) {
                        const { uri, label } = measure;
                        const payload = {
                            uri,
                            label,
                        };
                        const exitingMeasure = await this.unitsService.getUnit(payload);
                        if (exitingMeasure) {
                        }
                        else {
                            await this.unitsService.addUnit(payload);
                        }
                    }
                    const ingredientUnit = await tsx.units.findFirst({
                        where: {
                            label: unit,
                        },
                    });
                    await tsx.recipes_ingredients.create({
                        data: {
                            recipeId: newRecipe.id,
                            ingredientId,
                            unitId: ingredientUnit.id,
                            quantity: ingredient.quantity,
                            calories,
                            proteins,
                            carbs,
                            fats,
                        },
                    });
                }
                const stepsPayload = steps.map((step) => ({
                    recipeId: newRecipe.id,
                    step: step.step,
                    text: step.text,
                }));
                await tsx.steps.createMany({
                    data: stepsPayload,
                });
                return newRecipe;
            }, { timeout: 20000 });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                error: "Could not create recipe !",
            }, common_1.HttpStatus.CONFLICT);
        }
    }
    async editRecipePhoto(payload) {
        const { id, photoUrl } = payload;
        await this.prismaService.recipes.update({
            where: { id },
            data: { photoUrl },
        });
    }
    async editRecipe(payload) {
        const { recipe, ingredientsIds, stepsIds } = payload;
        try {
            const { id, title, servings, photoUrl, ingredients, steps, type, preparationTime } = recipe;
            await this.prismaService.$transaction(async (tsx) => {
                await tsx.recipes.update({
                    where: { id },
                    data: { title, servings, photoUrl, type, preparationTime },
                });
                if (ingredientsIds) {
                    await tsx.recipes_ingredients.deleteMany({
                        where: { AND: [{ ingredientId: { in: ingredientsIds } }, { recipeId: id }] },
                    });
                }
                for (let ingredient of ingredients) {
                    const { calories, carbs, proteins, fats, quantity, measure } = ingredient;
                    let unitId;
                    const existentUnit = await tsx.units.findFirst({
                        where: { label: measure },
                    });
                    if (!existentUnit) {
                        const newUnit = await tsx.units.create({ data: { label: measure, uri: ingredient.uri } });
                        unitId = newUnit.id;
                    }
                    else {
                        unitId = existentUnit.id;
                    }
                    if (!ingredient.id) {
                        let ingredientId;
                        const ingredientFromDB = await tsx.ingredients.findFirst({ where: { foodId: ingredient.foodId } });
                        if (!ingredientFromDB) {
                            const newIngredient = await tsx.ingredients.create({
                                data: { foodId: ingredient.foodId, name: ingredient.title },
                            });
                            ingredientId = newIngredient.id;
                        }
                        else {
                            ingredientId = ingredientFromDB.id;
                        }
                        await tsx.recipes_ingredients.create({
                            data: {
                                calories,
                                carbs,
                                proteins,
                                fats,
                                quantity,
                                recipeId: recipe.id,
                                unitId,
                                ingredientId,
                            },
                        });
                        ingredient.id = ingredientId;
                    }
                    else {
                        await tsx.recipes_ingredients.updateMany({
                            where: { AND: [{ recipeId: recipe.id }, { ingredientId: ingredient.id }] },
                            data: {
                                calories,
                                carbs,
                                proteins,
                                fats,
                                quantity,
                                unitId,
                            },
                        });
                    }
                }
                if (stepsIds) {
                    await tsx.steps.deleteMany({ where: { AND: [{ id: { in: stepsIds } }, { recipeId: id }] } });
                }
                for (let currentStep of steps) {
                    const { step, description } = currentStep;
                    if (!currentStep.id) {
                        const newStep = await tsx.steps.create({ data: { step, text: description, recipeId: id } });
                        currentStep.id = newStep.id;
                    }
                    else {
                        await tsx.steps.update({
                            where: { id: currentStep.id },
                            data: { text: currentStep.description },
                        });
                    }
                }
            });
            return {
                id,
                title,
                servings,
                photoUrl,
                ingredients,
                steps,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({ error }, common_1.HttpStatus.CONFLICT);
        }
    }
    async getRecipe(id) {
        try {
            const recipe = await this.prismaService.$queryRaw `SELECT 
     r.id,
     r.title,
     r.servings,
     r."photo_url" AS "photoUrl",
     r.type,
     r."preparation_time" AS "preparationTime",
     CAST(ROUND(SUM(ri.calories::numeric), 2) AS float8) AS "totalCalories",
    (
        SELECT json_agg(
          json_build_object(
            'id', i.id,
            'foodId', i."food_id", 
            'name', i.name,
            'quantity', ri.quantity,
            'unitId', u.id,
            'unit', u.label,
            'calories', CAST(ROUND(ri.calories::numeric, 2) AS float8),
            'carbs', CAST(ROUND(ri.carbs::numeric, 2) AS float8),
            'fats', CAST(ROUND(ri.fats::numeric, 2) AS float8),
            'proteins', CAST(ROUND(ri.proteins::numeric, 2) AS float8)
          )
        )
        FROM recipes_ingredients ri
        LEFT JOIN ingredients i ON ri."ingredient_id" = i.id
        LEFT JOIN units u ON ri."unit_id" = u.id
        WHERE ri."recipe_id" = r.id
      ) AS ingredients,
    
    (
        SELECT json_agg(
          json_build_object(
            'id', s.id,
            'step', s.step,
            'text', s.text
          )
        )
        FROM steps s
        WHERE s."recipe_id" = r.id
      ) AS steps
     
     
   FROM 
     recipes r
   LEFT JOIN 
     recipes_ingredients ri ON r.id = ri."recipe_id"
   LEFT JOIN 
     ingredients i ON ri."ingredient_id" = i.id
   LEFT JOIN 
     units u ON ri."unit_id" = u.id
   LEFT JOIN
     steps s ON s."recipe_id" = r.id
   WHERE 
     r.id = ${id} 
   GROUP BY 
     r.id;`;
            return recipe[0];
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({ error }, common_1.HttpStatus.CONFLICT);
        }
    }
    async updateViewCount(id) {
        try {
            await this.prismaService.recipes.update({
                where: {
                    id,
                },
                data: {
                    viewCount: {
                        increment: 1,
                    },
                },
            });
            return {
                message: "View count updated !",
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ingredients_service_1.IngredientsService,
        units_service_1.UnitsService])
], RecipeService);
//# sourceMappingURL=recipe.service.js.map