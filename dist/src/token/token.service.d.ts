import { PrismaService } from "src/prisma.service";
import { CreateTokenDto } from "./dtos/create-token.dto";
import { EmailService } from "src/email/email.service";
import { ConfirmTokenDto } from "./dtos/confirm-token.dto";
import { UsersService } from "src/public/users/users.service";
import { SendResetEmailDto } from "src/public/users/dtos/send-reset-email.dto";
export declare class TokenService {
    private readonly prismaService;
    private readonly emailService;
    private readonly usersService;
    constructor(prismaService: PrismaService, emailService: EmailService, usersService: UsersService);
    generateToken(token: string, payload: CreateTokenDto): Promise<void>;
    generateResetPasswordToken(body: SendResetEmailDto): Promise<void>;
    confirmToken(payload: ConfirmTokenDto): Promise<{
        message: string;
    }>;
    resendToken(payload: CreateTokenDto): Promise<void>;
    deleteToken(tokenId: number): Promise<void>;
}
