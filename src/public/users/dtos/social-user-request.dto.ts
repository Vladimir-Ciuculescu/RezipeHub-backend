import { IsEnum, IsString, isString } from 'class-validator';
import { SocialProvider } from 'types/enums';

export class SocialUserRequest {
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
}
