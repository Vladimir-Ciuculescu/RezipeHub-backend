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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DevicesService = class DevicesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async addDeviceToken(payload) {
        const { userId, deviceToken, deviceType } = payload;
        const existingDevice = await this.prismaService.user_devices.findFirst({
            where: {
                userId: userId,
                deviceType: deviceType,
            },
        });
        const conflictingDevice = await this.prismaService.user_devices.findFirst({
            where: {
                deviceToken: deviceToken,
            },
        });
        if (conflictingDevice) {
            await this.prismaService.user_devices.delete({
                where: { id: conflictingDevice.id },
            });
        }
        if (existingDevice) {
            await this.prismaService.user_devices.update({
                where: { id: existingDevice.id },
                data: { deviceToken: deviceToken },
            });
        }
        else {
            await this.prismaService.user_devices.create({
                data: {
                    userId: userId,
                    deviceToken: deviceToken,
                    deviceType: deviceType,
                    notificationsEnabled: true,
                },
            });
        }
    }
    async toggleDeviceNotifications(payload) {
        try {
            const { expoPushToken } = payload;
            const device = await this.prismaService.user_devices.findFirst({ where: { deviceToken: expoPushToken } });
            await this.prismaService.user_devices.update({
                where: { deviceToken: expoPushToken },
                data: { notificationsEnabled: !device.notificationsEnabled },
            });
            return {
                message: `Notifications ${device.notificationsEnabled ? "disabled" : "enabled"} !`,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevicesService);
//# sourceMappingURL=devices.service.js.map