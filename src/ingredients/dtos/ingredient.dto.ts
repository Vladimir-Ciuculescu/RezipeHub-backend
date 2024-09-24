import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { CreateUnitDto } from "src/units/dtos/units.dto";

export class IngredientDto {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  calories: number;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  carbs: number;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  proteins: number;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  fats: number;

  @IsString()
  foodId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUnitDto)
  @ArrayMinSize(1)
  measures: CreateUnitDto[];
}

export class CreateIngredientDto {
  @IsString()
  foodId: string;

  @IsString()
  name: string;
}

export class EditIngredientDto {
  @IsNumber()
  id: number;

  @IsString()
  foodId: string;

  @IsString()
  title: string;

  @IsNumber()
  quantity: number;

  @IsString()
  measure: string;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  calories: number;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  carbs: number;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  proteins: number;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  fats: number;
}
