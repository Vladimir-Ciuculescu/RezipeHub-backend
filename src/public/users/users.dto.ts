import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class GetProfileDto {
  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.id))
  id: number;

  @IsString()
  expoPushToken: string;
}

export class EditProfileDto {
  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.id))
  id: number;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  bio: string;
}
