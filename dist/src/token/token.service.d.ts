import { CreateTokenDto } from "./dtos/create-token.dto";
import { ConfirmTokenDto } from "./dtos/confirm-token.dto";
import { PrismaService } from "../prisma.service";
import { EmailService } from "../email/email.service";
import { UsersService } from "../public/users/users.service";
import { SendResetEmailDto } from "../public/users/dtos/send-reset-email.dto";
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
