import { Expose, Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class IsFavoriteDto {
  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.userId))
  userId: number;

  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.recipeId))
  recipeId: number;
}

export class GetFavoritesDto {
  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.page))
  page: number;

  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.limit))
  limit: number;

  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.userId))
  userId: number;
}
