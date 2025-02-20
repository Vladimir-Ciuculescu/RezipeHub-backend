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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma.service");
const email_service_1 = require("../../email/email.service");
const token_service_1 = require("../../token/token.service");
const s3_service_1 = require("../../s3/s3.service");
const hashPassword_1 = require("../../utils/hashPassword");
const generateToken_1 = require("../../utils/generateToken");
let UsersService = class UsersService {
    constructor(prismaService, emailService, tokenService, jwtService, s3Service) {
        this.prismaService = prismaService;
        this.emailService = emailService;
        this.tokenService = tokenService;
        this.jwtService = jwtService;
        this.s3Service = s3Service;
    }
    async findUser(email) {
        const user = await this.prismaService.users.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async createUser(body) {
        const { email, username, firstName, lastName, password } = body;
        const existentUser = await this.prismaService.users.findFirst({
            where: { OR: [{ email }, { username }] },
        });
        let errors = {};
        if (existentUser) {
            if (existentUser.email === email) {
                errors.email = "Email already in use";
            }
            if (existentUser.username === username) {
                errors.username = "Username already in use";
            }
            throw new common_1.HttpException(errors, common_1.HttpStatus.CONFLICT);
        }
        const hashedPassword = await (0, hashPassword_1.hashPassword)(password);
        const token = (0, generateToken_1.generateToken)(4);
        const user = await this.prismaService.users.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });
        const tokenPayload = {
            userId: user.id,
            email,
        };
        await this.prismaService.auth_methods.create({
            data: {
                provider: null,
                providerId: null,
                user: { connect: { id: user.id } },
            },
        });
        await this.tokenService.generateToken(token, tokenPayload);
        await this.emailService.sendMail(email, process.env.MAILTRAP_SENDER, `Verification Token - YumHub (${token})`, `Dear user,
Thank you for creating an account with us! To complete your registration, please verify your email address by entering the following 4-digit token in the app:

Verification Token: ${token}

This token is valid for 24 hours. If you did not request this verification, please ignore this email.

Best regards,
Yumhub`);
        return user;
    }
    async validateUser(userId) {
        try {
            await this.prismaService.users.update({
                where: { id: userId },
                data: { isVerified: true },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async getProfile(payload) {
        const { id, expoPushToken } = payload;
        try {
            const data = await this.prismaService.users.findFirst({
                where: { id },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    photoUrl: true,
                    bio: true,
                    isVerified: true,
                },
            });
            let notificationsEnabled = false;
            if (expoPushToken !== "") {
                const deviceNotificationsStatus = await this.prismaService.user_devices.findFirst({
                    where: {
                        userId: id,
                        deviceToken: expoPushToken,
                    },
                });
                notificationsEnabled = deviceNotificationsStatus.notificationsEnabled;
            }
            const tokenPayload = {
                ...data,
                notificationsEnabled,
            };
            const accessToken = await this.jwtService.signAsync(tokenPayload, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: "10m",
            });
            return accessToken;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException();
        }
    }
    async updateProfile(file, body) {
        const { id, firstName, lastName, email, bio } = body;
        let photoUrl = null;
        try {
            if (!file) {
                await this.s3Service.removeProfileImage({ userId: id });
            }
            else {
                const path = `users/${id}/profile`;
                const { url } = await this.s3Service.uploadImage(file, file.buffer, path);
                photoUrl = url;
            }
            const updatedUser = await this.prismaService.users.update({
                where: { id },
                data: { firstName, lastName, email, photoUrl, bio },
            });
            const payload = {
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                photoUrl: updatedUser.photoUrl,
                bio: updatedUser.bio,
            };
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: "10m",
            });
            return accessToken;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({ error: "Error during updating profile" }, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_service_1.TokenService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService,
        token_service_1.TokenService,
        jwt_1.JwtService,
        s3_service_1.S3Service])
], UsersService);
//# sourceMappingURL=users.service.js.map