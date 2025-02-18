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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const create_user_dto_1 = require("../public/users/dtos/create-user.dto");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const user_dto_1 = require("../public/users/dtos/user.dto");
const refresh_jwt_guard_1 = require("./guards/refresh-jwt.guard");
const user_request_dto_1 = require("../public/users/dtos/user-request.dto");
const social_user_request_dto_1 = require("../public/users/dtos/social-user-request.dto");
const reset_password_request_dto_1 = require("../public/users/dtos/reset-password-request.dto");
const user_login_dto_1 = require("../public/users/dtos/user-login.dto");
const user_logout_dto_1 = require("../public/users/dtos/user-logout.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    findAll(request) {
        return "This action returns all cats";
    }
    registerUser(body) {
        return this.authService.createUser(body);
    }
    loginUser(user, body) {
        return this.authService.login({ ...user, deviceToken: body.deviceToken, platform: body.platform });
    }
    socialLoginUser(body) {
        return this.authService.socialLogin(body);
    }
    resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    getProfile(user) {
        return user;
    }
    async refreshTokens(req) {
        return this.authService.refreshTokens(req.user, req.user.refreshToken);
    }
    async logOut(body) {
        return this.authService.logOut(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)("/cats"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", String)
], AuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("/register"),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)(new serialize_interceptor_1.SerializeInterceptor(user_dto_1.UserDto)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/login"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.UserRequestDto, user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/social-login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_user_request_dto_1.SocialUserRequestDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "socialLoginUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/reset-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_request_dto_1.ResetPasswordRequestDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("/profile"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.UserRequestDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(refresh_jwt_guard_1.RefreshJwtGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)("/refresh"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)("/logout"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_logout_dto_1.UserLogoutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map