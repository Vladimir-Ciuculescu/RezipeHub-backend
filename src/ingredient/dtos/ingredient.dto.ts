import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MeasureDto } from 'src/measure/dtos/measure.dto';

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

  @IsString()
  foodId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MeasureDto)
  @ArrayMinSize(1)
  measures: MeasureDto[];
}
