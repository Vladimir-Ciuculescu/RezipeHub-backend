import { ByCategoryRecipesDto, CreateRecipeDto, EditRecipeDto, EditRecipePhotoDto, LatestRecipesDto, MostPopularRecipesDto, RecipesDto, RecipesPerUserDto } from "./dtos/recipe.dtos";
import { PrismaService } from "src/prisma.service";
import { IngredientsService } from "src/ingredients/ingredients.service";
import { UnitsService } from "src/units/units.service";
export declare class RecipeService {
    private readonly prismaService;
    private readonly ingredientsService;
    private readonly unitsService;
    constructor(prismaService: PrismaService, ingredientsService: IngredientsService, unitsService: UnitsService);
    getLatestRecipes(query: LatestRecipesDto): Promise<{
        isInFavorites: boolean;
        id: number;
        user: {
            firstName: string;
            lastName: string;
            id: number;
            photoUrl: string;
        };
        photoUrl: string;
        title: string;
        preparationTime: number;
    }[]>;
    getMostPopularRecipes(query: MostPopularRecipesDto): Promise<{
        id: number;
        user: {
            firstName: string;
            lastName: string;
            id: number;
            photoUrl: string;
        };
        photoUrl: string;
        title: string;
        preparationTime: number;
        user_favorites: {
            id: number;
            recipeId: number;
            userId: number;
            createdAt: Date;
        }[];
    }[]>;
    getRecipesByCategory(query: ByCategoryRecipesDto): Promise<{
        id: number;
        user: {
            firstName: string;
            lastName: string;
            id: number;
            photoUrl: string;
        };
        photoUrl: string;
        title: string;
        preparationTime: number;
        user_favorites: {
            id: number;
            recipeId: number;
            userId: number;
            createdAt: Date;
        }[];
    }[]>;
    getRecipes(query: RecipesDto): Promise<unknown>;
    getRecipesByUser(query: RecipesPerUserDto): Promise<unknown>;
    createRecipe(payload: CreateRecipeDto): Promise<{
        id: number;
        userId: number;
        title: string;
        servings: number;
        photoUrl: string;
        type: string;
        preparationTime: number;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    editRecipePhoto(payload: EditRecipePhotoDto): Promise<void>;
    editRecipe(payload: EditRecipeDto): Promise<{
        id: number;
        title: string;
        servings: number;
        photoUrl: string;
        ingredients: import("../ingredients/dtos/ingredient.dto").EditIngredientDto[];
        steps: import("../steps/dtos/steps.dto").EditStepDto[];
    }>;
    getRecipe(id: any): Promise<any>;
    updateViewCount(id: number): Promise<{
        message: string;
    }>;
}
