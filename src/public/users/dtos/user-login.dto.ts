import { IsEnum, IsString } from "class-validator";
import { Platforms } from "../../../../types/enums";

export class UserLoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  deviceToken: string;

  @IsEnum(Platforms)
  platform: string;
}
