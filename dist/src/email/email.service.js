"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailtrap_1 = require("mailtrap");
const common_1 = require("@nestjs/common");
let EmailService = class EmailService {
    async sendMail(to, from, subject, text) {
        const TOKEN = process.env.MAILTRAP_TOKEN;
        const ENDPOINT = process.env.MAILTRAP_ENDPOINT;
        const client = new mailtrap_1.MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
        const sender = {
            email: from,
            name: subject,
        };
        const recipients = [
            {
                email: to,
            },
        ];
        try {
            await client.send({
                from: sender,
                to: recipients,
                subject,
                text,
                category: 'Integration Test',
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map