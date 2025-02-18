import { Module } from "@nestjs/common";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import { PrismaService } from "src/prisma.service";
import { NotificationsService } from "src/notifications/notifications.service";
import Expo from "expo-server-sdk";
import { ExpoService } from "src/expo/expo.service";

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, NotificationsService, Expo, ExpoService],
})
export class FavoritesModule {}
