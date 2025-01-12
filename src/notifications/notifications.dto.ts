import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class NotificationsDto {
  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.userId))
  userId: number;

  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.page))
  page: number;

  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.limit))
  limit: number;
}

export class ResetBadgeCountDto {
  @IsString()
  deviceToken: string;
}
