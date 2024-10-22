import { IsNumber } from "class-validator";

export class DeleteImageRecipeFromS3Dto {
  @IsNumber()
  recipeId: number;

  @IsNumber()
  userId: number;
}

export class DeleteProfileImageFromS3Dto {
  @IsNumber()
  userId: number;
}
