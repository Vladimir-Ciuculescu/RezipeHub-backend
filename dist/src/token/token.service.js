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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../types/enums");
const prisma_service_1 = require("../prisma.service");
const email_service_1 = require("../email/email.service");
const users_service_1 = require("../public/users/users.service");
const generateToken_1 = require("../utils/generateToken");
let TokenService = class TokenService {
    constructor(prismaService, emailService, usersService) {
        this.prismaService = prismaService;
        this.emailService = emailService;
        this.usersService = usersService;
    }
    async generateToken(token, payload) {
        const { userId } = payload;
        try {
            await this.prismaService.tokens.create({
                data: {
                    userId,
                    token,
                    type: enums_1.TokenType.ACCOUNT_VERIFICATION,
                    expiresAt: "",
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async generateResetPasswordToken(body) {
        const { email } = body;
        try {
            const user = await this.prismaService.users.findFirst({
                where: { email },
            });
            if (!user) {
                throw new common_1.HttpException({ error: "User not found !" }, common_1.HttpStatus.CONFLICT);
            }
            await this.prismaService.tokens.deleteMany({
                where: {
                    AND: [{ userId: user.id }, { type: enums_1.TokenType.PASSWORD_RESET }],
                },
            });
            const newToken = (0, generateToken_1.generateToken)(6);
            await this.prismaService.tokens.create({
                data: {
                    userId: user.id,
                    token: newToken,
                    type: enums_1.TokenType.PASSWORD_RESET,
                    expiresAt: "",
                },
            });
            await this.emailService.sendMail(email, process.env.MAILTRAP_SENDER, `YumHub - Password Resest`, `Hello,

We received a request to reset your password for your account associated with this email address. If you did not make this request, you can ignore this email.

To reset your password, please use the following 6-digit token: ${newToken}


This token is valid for the next 1 hour. If it expires, you will need to request a new password reset token.


Thank you,
YumHub`);
        }
        catch (error) {
            console.log(error);
        }
    }
    async confirmToken(payload) {
        const { userId, token } = payload;
        const tokenObj = await this.prismaService.tokens.findFirst({
            where: { userId, type: enums_1.TokenType.ACCOUNT_VERIFICATION },
        });
        if (!tokenObj) {
            throw new common_1.HttpException({ error: "Token not found or expired !" }, common_1.HttpStatus.CONFLICT);
        }
        const now = new Date();
        if (tokenObj.token !== token || tokenObj.expiresAt < now) {
            throw new common_1.HttpException({ error: "Token not found or expired !" }, common_1.HttpStatus.CONFLICT);
        }
        await this.usersService.validateUser(userId);
        await this.deleteToken(tokenObj.id);
        return { message: "User validated !" };
    }
    async resendToken(payload) {
        const { userId, email } = payload;
        try {
            await this.prismaService.tokens.deleteMany({
                where: { userId, type: enums_1.TokenType.ACCOUNT_VERIFICATION },
            });
            const token = (0, generateToken_1.generateToken)(4);
            await this.generateToken(token, payload);
            await this.emailService.sendMail(email, process.env.MAILTRAP_SENDER, `YumHub - Token Validation (${token})`, `Hello,

You recently requested to resend the verification token for your account. Please use the following 4-digit token to verify your email address:

Verification Token: ${token}

This token is valid for 24 hours. If you did not request this verification, please ignore this email.

Thank you for using our service!

Best regards,
YumHub`);
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteToken(tokenId) {
        try {
            await this.prismaService.tokens.delete({
                where: { id: tokenId, type: enums_1.TokenType.ACCOUNT_VERIFICATION },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService,
        users_service_1.UsersService])
], TokenService);
//# sourceMappingURL=token.service.js.map