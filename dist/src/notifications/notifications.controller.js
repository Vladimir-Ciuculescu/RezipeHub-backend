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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("./notifications.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const notifications_dto_1 = require("./notifications.dto");
const devices_service_1 = require("../devices/devices.service");
let NotificationsController = class NotificationsController {
    constructor(notificationsService, devicesService) {
        this.notificationsService = notificationsService;
        this.devicesService = devicesService;
    }
    getNotifications(query) {
        return this.notificationsService.getNotifications(query);
    }
    resetBadgeCount(body) {
        return this.notificationsService.resetBadgeCountNotification(body);
    }
    markAsReadNotification(params) {
        return this.notificationsService.markAsReadNotification(params);
    }
    toggleNotifications(params) {
        return this.devicesService.toggleDeviceNotifications(params);
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notifications_dto_1.NotificationsDto]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/reset-badge"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notifications_dto_1.ResetBadgeCountDto]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "resetBadgeCount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)("/mark-as-read"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notifications_dto_1.MarkAsReadDto]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markAsReadNotification", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)("/toggle-notifications"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notifications_dto_1.ToggleNotificationsDto]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "toggleNotifications", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)("notifications"),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        devices_service_1.DevicesService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map