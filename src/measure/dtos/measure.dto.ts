import { IsNumber, IsString } from 'class-validator';

export class MeasureDto {
  @IsString()
  uri: string;

  @IsString()
  label: string;

  @IsNumber()
  weight: number;
}
