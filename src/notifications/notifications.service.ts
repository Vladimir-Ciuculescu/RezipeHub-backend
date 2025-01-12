import { BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma.service";
import { ExpoService } from "src/expo/expo.service";
import { ResetBadgeCountDto } from "./notifications.dto";

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

  async addToFavoritesNotification(userId: number, senderId: number, recipeId: number) {
    const sender = await this.prismaService.users.findFirst({ where: { id: senderId } });

    await this.prismaService.user_devices.updateMany({
      where: { userId },
      data: {
        badgeCount: {
          increment: 1,
        },
      },
    });

    const devices = await this.prismaService.user_devices.findMany({ where: { userId: userId } });

    const deviceTokens = devices.map((device) => ({ deviceToken: device.deviceToken, badge: device.badgeCount }));

    await this.prismaService.notifications.create({
      data: {
        userId,
        title: `${sender.firstName} ${sender.lastName}`,
        body: "has appreciated your recipe",
        data: {
          recipeId,
        },
      },
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

  async resetBadgeCountNotification(body: ResetBadgeCountDto) {
    const { deviceToken } = body;

    try {
      await this.prismaService.user_devices.update({ where: { deviceToken }, data: { badgeCount: 0 } });
    } catch (error) {
      console.log("Error fetching the notifications ! :", error);
      throw new BadGatewayException();
    }
  }
}
