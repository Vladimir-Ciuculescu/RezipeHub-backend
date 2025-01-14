import { IsEnum, IsString } from "class-validator";
import { SocialProvider } from "types/enums";

export class SocialUserRequestDto {
  @IsEnum(SocialProvider)
  provider: SocialProvider;

  @IsString()
  providerUserId: string;

  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  deviceToken: string;

  @IsString()
  platform: string;
}
