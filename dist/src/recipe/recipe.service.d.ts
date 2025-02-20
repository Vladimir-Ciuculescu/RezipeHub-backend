import { ByCategoryRecipesDto, CreateRecipeDto, EditRecipeDto, EditRecipePhotoDto, LatestRecipesDto, MostPopularRecipesDto, RecipesDto, RecipesPerUserDto } from "./dtos/recipe.dtos";
import { PrismaService } from "../prisma.service";
import { IngredientsService } from "../ingredients/ingredients.service";
import { UnitsService } from "../units/units.service";
export declare class RecipeService {
    private readonly prismaService;
    private readonly ingredientsService;
    private readonly unitsService;
    constructor(prismaService: PrismaService, ingredientsService: IngredientsService, unitsService: UnitsService);
    getLatestRecipes(query: LatestRecipesDto): Promise<{
        isInFavorites: boolean;
        id: number;
        title: string;
        photoUrl: string;
        preparationTime: number;
        user: {
            id: number;
            photoUrl: string;
            firstName: string;
            lastName: string;
        };
    }[]>;
    getMostPopularRecipes(query: MostPopularRecipesDto): Promise<{
        id: number;
        title: string;
        photoUrl: string;
        preparationTime: number;
        user: {
            id: number;
            photoUrl: string;
            firstName: string;
            lastName: string;
        };
        user_favorites: {
            id: number;
            recipeId: number;
            userId: number;
            createdAt: Date;
        }[];
    }[]>;
    getRecipesByCategory(query: ByCategoryRecipesDto): Promise<{
        id: number;
        title: string;
        photoUrl: string;
        preparationTime: number;
        user: {
            id: number;
            photoUrl: string;
            firstName: string;
            lastName: string;
        };
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
