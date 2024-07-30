import { IsNumber, IsString } from 'class-validator';

export class StepDto {
  @IsNumber()
  step: number;

  @IsString()
  text: string;
}
