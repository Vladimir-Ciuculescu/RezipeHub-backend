import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './public/users/users.module';
import { EmailModule } from './email/email.module';
import { TokenModule } from './token/token.module';
import { RecipeModule } from './recipe/recipe.module';
import { StepModule } from './step/step.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { S3Service } from './s3/s3.service';
import { S3Client } from '@aws-sdk/client-s3';
import { S3Module } from './s3/s3.module';
import { MeasureModule } from './measure/measure.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    EmailModule,
    TokenModule,
    RecipeModule,
    StepModule,
    IngredientModule,
    S3Module,
    MeasureModule,
  ],
  providers: [S3Service, S3Client],
})
export class AppModule {}
