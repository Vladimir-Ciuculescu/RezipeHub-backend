import { EditIngredientDto, IngredientDto } from "src/ingredients/dtos/ingredient.dto";
import { EditStepDto, StepDto } from "src/steps/dtos/steps.dto";
import { RecipeType } from "types/enums";
export declare class CreateRecipeDto {
    userId: number;
    title: string;
    servings: number;
    photoUrl: string;
    type: RecipeType;
    preparationTime: number;
    ingredients: IngredientDto[];
    steps: StepDto[];
}
export declare class EditRecipeObjectDto {
    id: number;
    title: string;
    servings: number;
    photoUrl: string;
    type: RecipeType;
    preparationTime: number;
    ingredients: EditIngredientDto[];
    steps: EditStepDto[];
}
export declare class EditRecipeDto {
    recipe: EditRecipeObjectDto;
    ingredientsIds: number[];
    stepsIds: number[];
}
export declare class EditRecipePhotoDto {
    id: number;
    photoUrl: string;
}
export declare class RecipesDto {
    userId: number;
    title: string;
    categories: string[];
    caloriesRange: number[];
    preparationTimeRange: [min: number, max: number];
    page: number;
    limit: number;
}
export declare class LatestRecipesDto {
    userId: number;
    page: number;
    limit: number;
}
export declare class MostPopularRecipesDto {
    userId: number;
    page: number;
    limit: number;
}
export declare class ByCategoryRecipesDto {
    userId: number;
    page: number;
    limit: number;
    category: string;
}
export declare class RecipesPerUserDto {
    page: number;
    limit: number;
    userId: number;
}
export declare class RecipeBriefInfoDto {
    id: number;
    title: string;
    servings: number;
    photoUrl: string;
    type: RecipeType;
    preparationTime: number;
    totalCalories: number;
}
