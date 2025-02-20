"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const jwt_1 = require("@nestjs/jwt");
const client_s3_1 = require("@aws-sdk/client-s3");
const email_service_1 = require("../../email/email.service");
const token_service_1 = require("../../token/token.service");
const s3_service_1 = require("../../s3/s3.service");
const devices_service_1 = require("../../devices/devices.service");
const auth_service_1 = require("../../auth/auth.service");
const prisma_service_1 = require("../../prisma.service");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [
            auth_service_1.AuthService,
            users_service_1.UsersService,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
            email_service_1.EmailService,
            token_service_1.TokenService,
            s3_service_1.S3Service,
            client_s3_1.S3Client,
            devices_service_1.DevicesService,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map