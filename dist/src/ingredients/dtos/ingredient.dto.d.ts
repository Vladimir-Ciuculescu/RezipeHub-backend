import { CreateUnitDto } from "src/units/dtos/units.dto";
export declare class IngredientDto {
    name: string;
    unit: string;
    quantity: number;
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
    foodId: string;
    measures: CreateUnitDto[];
}
export declare class CreateIngredientDto {
    foodId: string;
    name: string;
}
export declare class EditIngredientDto {
    id?: number;
    foodId: string;
    title: string;
    uri?: string;
    quantity: number;
    measure: string;
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
}
