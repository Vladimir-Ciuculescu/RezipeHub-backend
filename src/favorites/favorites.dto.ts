import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class IsFavoriteDto {
  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.userId))
  userId: number;

  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.recipeId))
  recipeId: number;
}
