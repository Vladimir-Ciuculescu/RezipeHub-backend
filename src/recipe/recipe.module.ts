import { Module } from "@nestjs/common";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { PrismaService } from "prisma.service";
import { S3Service } from "src/s3/s3.service";
import { S3Client } from "@aws-sdk/client-s3";
import { IngredientsService } from "src/ingredients/ingredients.service";
import { UnitsService } from "src/units/units.service";
import { StepsService } from "src/steps/steps.service";

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService, S3Client, S3Service, IngredientsService, UnitsService, StepsService],
})
export class RecipeModule {}
