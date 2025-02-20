import { Module } from "@nestjs/common";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import Expo from "expo-server-sdk";
import { PrismaService } from "../prisma.service";
import { ExpoService } from "../expo/expo.service";
import { NotificationsService } from "../notifications/notifications.service";

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, NotificationsService, Expo, ExpoService],
})
export class FavoritesModule {}
