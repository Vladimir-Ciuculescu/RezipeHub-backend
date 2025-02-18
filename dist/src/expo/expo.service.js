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
exports.ExpoService = void 0;
const common_1 = require("@nestjs/common");
const expo_server_sdk_1 = require("expo-server-sdk");
let ExpoService = class ExpoService {
    constructor(expo) {
        this.expo = expo;
    }
    async sendExpoPushNotification(deviceTokens, notificationPayload) {
        const { title, body, data } = notificationPayload;
        try {
            let notifications = [];
            for (let deviceToken of deviceTokens) {
                if (!expo_server_sdk_1.default.isExpoPushToken(deviceToken.deviceToken)) {
                    console.error(`Push token ${deviceToken.deviceToken} not valid !`);
                    continue;
                }
                notifications.push({
                    to: deviceToken.deviceToken,
                    sound: "default",
                    title,
                    body,
                    data: data || {},
                    badge: deviceToken.badge,
                });
            }
            let chunks = this.expo.chunkPushNotifications(notifications);
            for (let chunk of chunks) {
                try {
                    await this.expo.sendPushNotificationsAsync(chunk);
                }
                catch (error) {
                    console.log("Error sending certain notification", error);
                }
            }
        }
        catch (error) {
            console.log("Error sending notifications");
        }
    }
};
exports.ExpoService = ExpoService;
exports.ExpoService = ExpoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expo_server_sdk_1.default])
], ExpoService);
//# sourceMappingURL=expo.service.js.map