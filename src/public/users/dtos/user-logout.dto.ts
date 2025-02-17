import { IsNumber, IsString } from "class-validator";

export class UserLogoutDto {
  @IsNumber()
  id: number;

  @IsString()
  expoPushToken: string;
}
