import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateTokenDto {
  @Transform(({ obj }) => parseInt(obj.userId))
  @IsNumber()
  userId: number;

  @IsString()
  email: string;
}
