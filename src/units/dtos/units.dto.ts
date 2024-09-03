import { IsNumber, IsString } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  uri: string;

  @IsString()
  label: string;

  @IsNumber()
  weight: number;
}

export class UnitDto {
  @IsString()
  uri: string;

  @IsString()
  label: string;
}
