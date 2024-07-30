import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IngredientDto } from 'src/ingredient/dtos/ingredient.dto';
import { StepDto } from 'src/step/dtos/step.dto';

export class CreateRecipeDto {
  @IsNumber()
  userId: number;

  @IsString()
  title: string;

  @IsInt()
  servings: number;

  @IsOptional()
  @IsString()
  photoUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  @ArrayMinSize(1)
  ingredients: IngredientDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  @ArrayMinSize(1)
  steps: StepDto[];
}
