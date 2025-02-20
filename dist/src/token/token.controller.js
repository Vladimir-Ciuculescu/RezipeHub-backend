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
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("./token.service");
const create_token_dto_1 = require("./dtos/create-token.dto");
const confirm_token_dto_1 = require("./dtos/confirm-token.dto");
const send_reset_email_dto_1 = require("../public/users/dtos/send-reset-email.dto");
let TokenController = class TokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    confirmToken(body) {
        return this.tokenService.confirmToken(body);
    }
    resendToken(query) {
        return this.tokenService.resendToken(query);
    }
    sendResetEmail(body) {
        return this.tokenService.generateResetPasswordToken(body);
    }
};
exports.TokenController = TokenController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/confirm"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_token_dto_1.ConfirmTokenDto]),
    __metadata("design:returntype", void 0)
], TokenController.prototype, "confirmToken", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)("/resend"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", void 0)
], TokenController.prototype, "resendToken", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/send-reset-email"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_reset_email_dto_1.SendResetEmailDto]),
    __metadata("design:returntype", void 0)
], TokenController.prototype, "sendResetEmail", null);
exports.TokenController = TokenController = __decorate([
    (0, common_1.Controller)("token"),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenController);
//# sourceMappingURL=token.controller.js.map