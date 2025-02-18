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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const expo_service_1 = require("../expo/expo.service");
let NotificationsService = class NotificationsService {
    constructor(prismaService, expoService) {
        this.prismaService = prismaService;
        this.expoService = expoService;
    }
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
                    read: true,
                    actor: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            photoUrl: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: limit * page,
                take: limit,
            });
            const notificationsWithPhotos = await Promise.all(notifications.map(async (notification) => {
                if (notification.data && notification.data["recipeId"]) {
                    const recipe = await this.prismaService.recipes.findUnique({
                        where: { id: notification.data["recipeId"] },
                        select: { photoUrl: true },
                    });
                    return {
                        ...notification,
                        data: {
                            ...notification.data,
                            recipePhotoUrl: recipe?.photoUrl || null,
                        },
                    };
                }
                return {
                    ...notification,
                    data: {
                        ...notification.data,
                        recipePhotoUrl: null,
                    },
                };
            }));
            return notificationsWithPhotos;
        }
        catch (error) {
            console.log("Error fetching the notifications ! :", error);
            throw new common_1.BadGatewayException();
        }
    }
    async addToFavoritesNotification(userId, senderId, recipeId) {
        const sender = await this.prismaService.users.findFirst({ where: { id: senderId } });
        await this.prismaService.user_devices.updateMany({
            where: { userId },
            data: {
                badgeCount: {
                    increment: 1,
                },
            },
        });
        const devices = await this.prismaService.user_devices.findMany({
            where: {
                userId: userId,
                deviceToken: { not: null },
                notificationsEnabled: true,
            },
        });
        const deviceTokens = devices.map((device) => ({ deviceToken: device.deviceToken, badge: device.badgeCount }));
        await this.prismaService.notifications.create({
            data: {
                userId,
                actorId: senderId,
                title: `Appreciation from ${sender.firstName} ${sender.lastName}`,
                body: `${sender.firstName} ${sender.lastName} appreciated your recipe`,
                data: {
                    recipeId,
                    creatorId: userId,
                },
            },
        });
        const notificationPayload = {
            title: `${sender.firstName} ${sender.lastName}`,
            body: "appreciated your recipe",
            data: {
                url: "(tabs)/notifications",
            },
        };
        await this.expoService.sendExpoPushNotification(deviceTokens, notificationPayload);
    }
    async resetBadgeCountNotification(body) {
        const { deviceToken } = body;
        try {
            await this.prismaService.user_devices.update({ where: { deviceToken }, data: { badgeCount: 0 } });
        }
        catch (error) {
            console.log("Error fetching the notifications ! :", error);
            throw new common_1.BadGatewayException();
        }
    }
    async markAsReadNotification(params) {
        const { notificationId } = params;
        try {
            await this.prismaService.notifications.update({ where: { id: notificationId }, data: { read: true } });
        }
        catch (error) {
            console.log("Error marking notification as read :", error);
            throw new common_1.BadGatewayException();
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        expo_service_1.ExpoService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map