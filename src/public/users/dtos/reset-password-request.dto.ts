import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  token: string;

  @IsString()
  password: string;
}
