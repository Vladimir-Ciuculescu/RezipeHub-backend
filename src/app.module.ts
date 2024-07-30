import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './public/users/users.module';
import { EmailModule } from './email/email.module';
import { TokenModule } from './token/token.module';
import { RecipeModule } from './recipe/recipe.module';
import { StepModule } from './step/step.module';
import { IngredientModule } from './ingredient/ingredient.module';

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
  ],
})
export class AppModule {}
