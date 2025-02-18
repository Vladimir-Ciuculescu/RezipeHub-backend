"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const users_service_1 = require("../public/users/users.service");
const prisma_service_1 = require("../../prisma.service");
const local_strategy_1 = require("./strategies/local.strategy");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const refresh_jwt_strategy_1 = require("./strategies/refresh-jwt.strategy");
const email_service_1 = require("../email/email.service");
const token_service_1 = require("../token/token.service");
const s3_service_1 = require("../s3/s3.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const devices_service_1 = require("../devices/devices.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            users_service_1.UsersService,
            email_service_1.EmailService,
            prisma_service_1.PrismaService,
            token_service_1.TokenService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            refresh_jwt_strategy_1.RefreshJwtStrategy,
            users_service_1.UsersService,
            s3_service_1.S3Service,
            client_s3_1.S3Client,
            devices_service_1.DevicesService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map