import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";

export class UserRequestDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  photoUrl: string;

  @IsString()
  bio: string;

  @IsBoolean()
  isVerified: string;

  @IsString()
  deviceToken: string;

  @IsString()
  platform: string;
}
