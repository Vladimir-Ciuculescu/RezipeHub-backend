import { IsNumber, IsString } from "class-validator";

export class AddDeviceDto {
  @IsNumber()
  userId: number;

  @IsString()
  deviceToken: string;

  @IsString()
  deviceType: string;
}
