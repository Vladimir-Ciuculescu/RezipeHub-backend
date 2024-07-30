import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaService } from 'prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService, S3Client, S3Service],
})
export class RecipeModule {}
