import { Module } from "@nestjs/common";
import { ExpoService } from "./expo.service";
import Expo from "expo-server-sdk";

@Module({
  providers: [ExpoService, Expo],
})
export class ExpoModule {}
