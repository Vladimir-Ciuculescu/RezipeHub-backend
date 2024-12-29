import { Injectable } from "@nestjs/common";
import Expo from "expo-server-sdk";
import { PrismaService } from "prisma.service";
import { ExpoService } from "src/expo/expo.service";

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly expoService: ExpoService,
  ) {}

  async addToFavoritesNotification(userId: number, senderId: number) {
    const sender = await this.prismaService.users.findFirst({ where: { id: senderId } });

    const devices = await this.prismaService.user_devices.findMany({ where: { userId: userId } });

    const deviceTokens = devices.map((device) => device.deviceToken);

    const notificationPayload = {
      title: `${sender.firstName} ${sender.lastName}`,
      body: "has appreciated your recipe",
      data: {
        title: "hello",
      },
    };

    await this.expoService.sendExpoPushNotification(deviceTokens, notificationPayload);
  }
}
