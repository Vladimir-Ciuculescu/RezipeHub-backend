import { CreateIngredientDto } from "./dtos/ingredient.dto";
import { PrismaService } from "../prisma.service";
export declare class IngredientsService {
    private readonly prsimaService;
    constructor(prsimaService: PrismaService);
    getIngredient(foodId: string): Promise<{
        id: number;
        foodId: string;
        name: string;
    }>;
    addIngredient(payload: CreateIngredientDto): Promise<{
        id: number;
        foodId: string;
        name: string;
    }>;
}
