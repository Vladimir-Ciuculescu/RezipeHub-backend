import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ConfirmTokenDto {
  @Transform(({ obj }) => parseInt(obj.userId))
  @IsNumber()
  userId: number;

  @IsString()
  token: string;
}
