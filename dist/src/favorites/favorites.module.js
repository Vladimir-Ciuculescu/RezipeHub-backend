"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesModule = void 0;
const common_1 = require("@nestjs/common");
const favorites_controller_1 = require("./favorites.controller");
const favorites_service_1 = require("./favorites.service");
const prisma_service_1 = require("../prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const expo_server_sdk_1 = require("expo-server-sdk");
const expo_service_1 = require("../expo/expo.service");
let FavoritesModule = class FavoritesModule {
};
exports.FavoritesModule = FavoritesModule;
exports.FavoritesModule = FavoritesModule = __decorate([
    (0, common_1.Module)({
        controllers: [favorites_controller_1.FavoritesController],
        providers: [favorites_service_1.FavoritesService, prisma_service_1.PrismaService, notifications_service_1.NotificationsService, expo_server_sdk_1.default, expo_service_1.ExpoService],
    })
], FavoritesModule);
//# sourceMappingURL=favorites.module.js.map