import { BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma.service";
import { ExpoService } from "src/expo/expo.service";

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly expoService: ExpoService,
  ) {}

  async getNotifications(query) {
    const { userId, page, limit } = query;

    try {
      const notifications = await this.prismaService.notifications.findMany({
        where: { userId },
        select: {
          id: true,
          title: true,
          body: true,
          data: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: limit * page,
        take: limit,
      });

      return notifications;
    } catch (error) {
      console.log("Error fetching the notifications ! :", error);
      throw new BadGatewayException();
    }
  }

  async addToFavoritesNotification(userId: number, senderId: number) {
    const sender = await this.prismaService.users.findFirst({ where: { id: senderId } });

    const devices = await this.prismaService.user_devices.findMany({ where: { userId: userId } });

    const deviceTokens = devices.map((device) => device.deviceToken);

    await this.prismaService.notifications.create({
      data: { userId, title: `${sender.firstName} ${sender.lastName}`, body: "has appreciated your recipe" },
    });

    const notificationPayload = {
      title: `${sender.firstName} ${sender.lastName}`,
      body: "has appreciated your recipe",
      data: {
        url: "(tabs)/notifications",
      },
    };

    await this.expoService.sendExpoPushNotification(deviceTokens, notificationPayload);
  }
}
