import { IsNumber } from "class-validator";

export class UserLogoutDto {
  @IsNumber()
  id: number;
}
