import { IsNumber } from "class-validator";

export class IsFavoriteDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  recipeId: number;
}
