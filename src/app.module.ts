import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./public/users/users.module";
import { EmailModule } from "./email/email.module";
import { TokenModule } from "./token/token.module";
import { RecipeModule } from "./recipe/recipe.module";
import { StepModule } from "./steps/steps.module";
import { S3Service } from "./s3/s3.service";
import { S3Client } from "@aws-sdk/client-s3";
import { S3Module } from "./s3/s3.module";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { UnitsModule } from "./units/units.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { NotificationsService } from "./notifications/notifications.service";
import { DevicesService } from "./devices/devices.service";
import { DevicesModule } from "./devices/devices.module";
import { ExpoModule } from "./expo/expo.module";
import Expo from "expo-server-sdk";
import { ExpoService } from "./expo/expo.service";
import { NotificationsController } from "./notifications/notifications.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskService } from "./task/task.service";
import { AiService } from "./ai/ai.service";
import { HealthModule } from "./health/health.module";
import { TerminusModule } from "@nestjs/terminus";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    EmailModule,
    TokenModule,
    RecipeModule,
    StepModule,
    IngredientsModule,
    S3Module,
    UnitsModule,
    FavoritesModule,
    DevicesModule,
    ExpoModule,
    ScheduleModule.forRoot(),
    HealthModule,
    TerminusModule,
  ],
  providers: [
    S3Service,
    S3Client,
    NotificationsService,
    DevicesService,
    PrismaService,
    Expo,
    ExpoService,
    TaskService,
    AiService,
  ],
  controllers: [NotificationsController],
})
export class AppModule {}
