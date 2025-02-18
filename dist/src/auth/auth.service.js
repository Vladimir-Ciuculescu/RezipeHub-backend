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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../public/users/users.service");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma.service");
const enums_1 = require("../../types/enums");
const hashPassword_1 = require("../utils/hashPassword");
const devices_service_1 = require("../devices/devices.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, prismaService, devicesService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prismaService = prismaService;
        this.devicesService = devicesService;
    }
    async validateUser(email, password) {
        try {
            const user = await this.usersService.findUser(email);
            if (!user) {
                return null;
            }
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return null;
            }
            return user;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({ error: "Error validating user " }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(user) {
        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.photoUrl,
            bio: user.bio,
            isVerified: user.isVerified,
        };
        const { accessToken, refreshToken } = await this.generateTokens(payload);
        await this.updateRefreshToken(user.id, refreshToken);
        const devicePayload = {
            userId: user.id,
            deviceToken: user.deviceToken,
            deviceType: user.platform,
        };
        await this.devicesService.addDeviceToken(devicePayload);
        return {
            user: { ...payload },
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async socialLogin(user) {
        const { email, provider, providerUserId, firstName, lastName, deviceToken, platform } = user;
        let payload;
        let userId;
        const existentUser = await this.prismaService.users.findFirst({
            where: { email: email },
        });
        if (existentUser) {
            userId = existentUser.id;
            const existentAuthMethod = await this.prismaService.auth_methods.findFirst({
                where: { AND: [{ userId: existentUser.id }, { provider: provider }] },
            });
            if (existentAuthMethod) {
                await this.prismaService.auth_methods.updateMany({
                    where: { AND: [{ userId: existentUser.id }, { provider: provider }] },
                    data: { providerId: providerUserId },
                });
            }
            else {
                await this.prismaService.auth_methods.create({
                    data: {
                        userId: existentUser.id,
                        provider: provider,
                        providerId: providerUserId,
                    },
                });
            }
            const { id, email, firstName, lastName, photoUrl, bio, isVerified } = existentUser;
            payload = {
                id,
                email,
                firstName,
                lastName,
                photoUrl,
                bio,
                isVerified,
            };
        }
        else {
            const newUser = await this.prismaService.users.create({
                data: { email: email, firstName: firstName, lastName: lastName },
            });
            userId = newUser.id;
            await this.prismaService.auth_methods.create({
                data: {
                    provider: provider,
                    providerId: providerUserId,
                    userId: newUser.id,
                },
            });
            payload = {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                photoUrl: newUser.photoUrl,
                bio: newUser.bio,
                isVerified: newUser.isVerified,
            };
        }
        const { accessToken, refreshToken } = await this.generateTokens(payload);
        await this.updateRefreshToken(userId, refreshToken);
        const devicePayload = {
            userId,
            deviceToken,
            deviceType: platform,
        };
        await this.devicesService.addDeviceToken(devicePayload);
        return {
            user: { ...payload },
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async resetPassword(payload) {
        const { email, token, password } = payload;
        const user = await this.prismaService.users.findFirst({
            where: { email: email },
        });
        if (!user) {
            throw new common_1.HttpException({ error: "User not found !" }, common_1.HttpStatus.NOT_FOUND);
        }
        const storedToken = await this.prismaService.tokens.findFirst({
            where: { AND: [{ userId: user.id }, { type: enums_1.TokenType.PASSWORD_RESET }] },
        });
        const now = new Date();
        if (!storedToken || storedToken.token !== token || storedToken.expiresAt < now) {
            throw new common_1.HttpException({ error: "Token not valid or expired" }, common_1.HttpStatus.NOT_FOUND);
        }
        const hashedPassword = await (0, hashPassword_1.hashPassword)(password);
        await this.prismaService.users.update({
            where: {
                email: email,
            },
            data: {
                password: hashedPassword,
            },
        });
        await this.prismaService.tokens.deleteMany({
            where: { AND: [{ userId: user.id }, { type: enums_1.TokenType.PASSWORD_RESET }] },
        });
    }
    async refreshTokens(data, oldRefreshToken) {
        const user = await this.prismaService.users.findUnique({
            where: { id: data.id },
        });
        if (!user || !user.refreshToken) {
            throw new common_1.ForbiddenException();
        }
        const isMatchRefreshToken = await bcrypt.compare(oldRefreshToken, user.refreshToken);
        if (!isMatchRefreshToken) {
            throw new common_1.BadGatewayException();
        }
        const payload = {
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            photoUrl: data.photoUrl,
            bio: data.bio,
        };
        const { accessToken, refreshToken } = await this.generateTokens(payload);
        await this.updateRefreshToken(data.id, refreshToken);
        return { access_token: accessToken, refresh_token: refreshToken };
    }
    async createUser(body) {
        const user = await this.usersService.createUser(body);
        return user;
    }
    async generateTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign(payload, { expiresIn: "10m" }),
            this.jwtService.sign(payload, { expiresIn: "30d" }),
        ]);
        return { accessToken, refreshToken };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedToken = await bcrypt.hash(refreshToken, 10);
        await this.prismaService.users.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: hashedToken,
            },
        });
    }
    async logOut(body) {
        const { id, expoPushToken } = body;
        try {
            await this.prismaService.users.update({ where: { id: id }, data: { refreshToken: null } });
            if (expoPushToken) {
                await this.prismaService.user_devices.updateMany({
                    where: {
                        AND: [{ userId: id }, { deviceToken: expoPushToken }],
                    },
                    data: {
                        deviceToken: null,
                    },
                });
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({ error: "Error logging out user" }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService,
        devices_service_1.DevicesService])
], AuthService);
//# sourceMappingURL=auth.service.js.map