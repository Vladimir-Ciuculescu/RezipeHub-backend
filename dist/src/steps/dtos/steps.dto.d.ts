export declare class StepDto {
    step: number;
    text: string;
}
export declare class CreateStepDto {
    recipeId: number;
    step: number;
    text: string;
}
export declare class EditStepDto {
    id?: number;
    step: number;
    number: number;
    description: string;
}
