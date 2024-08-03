import { Expose, Transform, Type } from 'class-transformer';
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

export class RecipesPerUserDto {
  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.page))
  page: number;

  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.limit))
  limit: number;

  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.userId))
  userId: number;
}

export class RecipeBriefInfoDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  servings: number;

  @Expose()
  photoUrl: string;
}
