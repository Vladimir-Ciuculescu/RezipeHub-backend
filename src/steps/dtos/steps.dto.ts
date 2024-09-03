import { IsNumber, IsString } from 'class-validator';

export class StepDto {
  @IsNumber()
  step: number;

  @IsString()
  text: string;
}

export class CreateStepDto {
  @IsNumber()
  recipeId: number;

  @IsNumber()
  step: number;

  @IsString()
  text: string;
}

export class EditStepDto {
  @IsNumber()
  id: number;

  @IsNumber()
  step: number;

  @IsNumber()
  number: number;

  @IsString()
  description: string;
}
