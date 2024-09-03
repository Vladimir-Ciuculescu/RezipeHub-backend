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
import {
  EditIngredientDto,
  IngredientDto,
} from 'src/ingredients/dtos/ingredient.dto';
import { EditStepDto, StepDto } from 'src/steps/dtos/steps.dto';

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

export class EditRecipeObjectDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  servings: number;

  @IsString()
  photoUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditIngredientDto)
  @ArrayMinSize(1)
  ingredients: EditIngredientDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditStepDto)
  @ArrayMinSize(1)
  steps: EditStepDto[];
}

export class EditRecipeDto {
  @ValidateNested()
  @Type(() => EditRecipeObjectDto)
  recipe: EditRecipeObjectDto;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  ingredientsIds: number[];

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  nutritionalInfoIds: number[];

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  stepsIds: number[];
}

export class EditRecipePhotoDto {
  @IsNumber()
  id: number;

  @IsString()
  photoUrl: string;
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
