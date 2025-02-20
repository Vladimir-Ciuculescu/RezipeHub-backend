import { Module } from "@nestjs/common";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { S3Client } from "@aws-sdk/client-s3";
import { PrismaService } from "../prisma.service";
import { IngredientsService } from "../ingredients/ingredients.service";
import { UnitsService } from "../units/units.service";
import { StepsService } from "../steps/steps.service";
import { S3Service } from "../s3/s3.service";

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService, S3Client, S3Service, IngredientsService, UnitsService, StepsService],
})
export class RecipeModule {}
