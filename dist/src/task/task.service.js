"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const expo_server_sdk_1 = require("expo-server-sdk");
const prisma_service_1 = require("../prisma.service");
const ai_service_1 = require("../ai/ai.service");
let TaskService = class TaskService {
    constructor(prismaService, Expo, aiService) {
        this.prismaService = prismaService;
        this.Expo = Expo;
        this.aiService = aiService;
    }
    async sendExpoNotifications(messages) {
        const chunks = this.Expo.chunkPushNotifications(messages);
        const tickets = [];
        for (const chunk of chunks) {
            try {
                const ticketChunk = await this.Expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            }
            catch (error) {
                console.error("Error sending notification chunk:", error);
            }
        }
        return tickets;
    }
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
            const notifications = [];
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
                    const messages = [
                        { role: "system", content: "You generate short and clear mobile push notifications." },
                        { role: "user", content: prompt },
                    ];
                    const { title, body } = await this.aiService.generateNotificationContent(messages, 50);
                    user.devices.forEach((device) => {
                        if (expo_server_sdk_1.default.isExpoPushToken(device.deviceToken)) {
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
        }
        catch (error) {
            console.error("Error sending daily recommendations:", error);
        }
    }
};
exports.TaskService = TaskService;
__decorate([
    (0, schedule_1.Cron)("0 12 */2 * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "sendTrendingRecipeNotifications", null);
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        expo_server_sdk_1.default,
        ai_service_1.AiService])
], TaskService);
//# sourceMappingURL=task.service.js.map