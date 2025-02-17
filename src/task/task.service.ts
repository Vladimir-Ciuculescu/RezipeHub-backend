import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import Expo, { ExpoPushMessage } from "expo-server-sdk";
import { ChatCompletionMessageParam } from "openai/resources";
import { PrismaService } from "prisma.service";
import { AiService } from "src/ai/ai.service";

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly Expo: Expo,
    private readonly aiService: AiService,
  ) {}

  private async sendExpoNotifications(messages: ExpoPushMessage[]) {
    const chunks = this.Expo.chunkPushNotifications(messages);

    const tickets = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await this.Expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending notification chunk:", error);
      }
    }

    return tickets;
  }

  //Run
  // @Cron("0 10 * * * *	")
  // @Cron("*/3 * * * * *")
  // @Cron("*/15 * * * * *")
  @Cron("0 12 */2 * *") // Runs every 2 days at 12:00 PM
  async sendTrendingRecipeNotifications() {
    try {
      const users = await this.prismaService.users.findMany({
        where: {
          devices: {
            some: {
              deviceToken: { not: null },
              notificationsEnabled: true,
            },
          },
        },
        include: {
          devices: true,
          users_favorites: {
            include: {
              recipe: true,
            },
          },
        },
      });

      const notifications: ExpoPushMessage[] = [];

      for (const user of users) {
        const recommendedRecipe = await this.prismaService.recipes.findFirst({
          where: {
            NOT: {
              userId: user.id,
            },
            user_favorites: { none: { userId: user.id } },
          },
          orderBy: { viewCount: "desc" },
        });

        if (recommendedRecipe) {
          const context = {
            type: "recommendation",
            recipes: recommendedRecipe,
            userPreferences: user.users_favorites.map((fav) => fav.recipe.type),
          };

          const prompt = `Generate a mobile push notification in JSON format with:
      - "title": A short and engaging sentence (max 8 words) with a meaningul emoji.
      - "body": A concise message (max 15 words).

      Format the response as:
      {
        "title": "Your short title",
        "body": "Your concise message"
      }

      Context: ${JSON.stringify(context)}`;

          const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: "You generate short and clear mobile push notifications." },
            { role: "user", content: prompt },
          ];

          const { title, body } = await this.aiService.generateNotificationContent(messages, 50);

          user.devices.forEach((device) => {
            if (Expo.isExpoPushToken(device.deviceToken)) {
              notifications.push({
                to: device.deviceToken,
                sound: "default",

                title,
                body,
                data: { recipeId: recommendedRecipe.id, url: "(tabs)/notifications" },
                badge: device.badgeCount + 1,
              });
            }
          });

          // Store notification in database
          await this.prismaService.notifications.create({
            data: {
              userId: user.id,

              title,
              body,
              data: { recipeId: recommendedRecipe.id, creatorId: recommendedRecipe.userId },
            },
          });

          await this.prismaService.user_devices.updateMany({
            where: { userId: user.id },
            data: {
              badgeCount: {
                increment: 1,
              },
            },
          });
        }
      }

      await this.sendExpoNotifications(notifications);
    } catch (error) {
      console.error("Error sending daily recommendations:", error);
    }
  }
}
