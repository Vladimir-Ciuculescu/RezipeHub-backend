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
exports.ToggleNotificationsDto = exports.MarkAsReadDto = exports.ResetBadgeCountDto = exports.NotificationsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class NotificationsDto {
}
exports.NotificationsDto = NotificationsDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.userId)),
    __metadata("design:type", Number)
], NotificationsDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.page)),
    __metadata("design:type", Number)
], NotificationsDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.limit)),
    __metadata("design:type", Number)
], NotificationsDto.prototype, "limit", void 0);
class ResetBadgeCountDto {
}
exports.ResetBadgeCountDto = ResetBadgeCountDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetBadgeCountDto.prototype, "deviceToken", void 0);
class MarkAsReadDto {
}
exports.MarkAsReadDto = MarkAsReadDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.notificationId)),
    __metadata("design:type", Number)
], MarkAsReadDto.prototype, "notificationId", void 0);
class ToggleNotificationsDto {
}
exports.ToggleNotificationsDto = ToggleNotificationsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ToggleNotificationsDto.prototype, "expoPushToken", void 0);
//# sourceMappingURL=notifications.dto.js.map