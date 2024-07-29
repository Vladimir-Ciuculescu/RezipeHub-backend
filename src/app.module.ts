import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './public/users/users.module';
import { EmailModule } from './email/email.module';
import { TokenModule } from './token/token.module';
import { RecipeController } from './recipe/recipe.controller';
import { RecipeService } from './recipe/recipe.service';
import { StepController } from './step/step.controller';
import { StepService } from './step/step.service';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientService } from './ingredient/ingredient.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, EmailModule, TokenModule],
  controllers: [RecipeController, StepController, IngredientController],
  providers: [RecipeService, StepService, IngredientService],
})
export class AppModule {}
