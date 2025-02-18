import { RecipeService } from "./recipe.service";
import { ByCategoryRecipesDto, CreateRecipeDto, EditRecipeDto, EditRecipePhotoDto, LatestRecipesDto, MostPopularRecipesDto, RecipesDto, RecipesPerUserDto } from "./dtos/recipe.dtos";
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    getRecipes(query: RecipesDto): Promise<unknown>;
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
    getRecipesByUser(query: RecipesPerUserDto): Promise<unknown>;
    addRecipe(body: CreateRecipeDto): Promise<{
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
    editRecipePhoto(body: EditRecipePhotoDto): Promise<void>;
    editRecipe(body: EditRecipeDto): Promise<{
        id: number;
        title: string;
        servings: number;
        photoUrl: string;
        ingredients: import("../ingredients/dtos/ingredient.dto").EditIngredientDto[];
        steps: import("../steps/dtos/steps.dto").EditStepDto[];
    }>;
    getRecipe(id: string): Promise<any>;
    updateViewCount(id: string): Promise<{
        message: string;
    }>;
}
