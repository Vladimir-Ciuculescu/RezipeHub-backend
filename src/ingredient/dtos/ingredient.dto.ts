import { IsNumber, IsString } from 'class-validator';

export class IngredientDto {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  calories: number;

  @IsNumber()
  carbs: number;

  @IsNumber()
  proteins: number;

  @IsNumber()
  fats: number;
}
