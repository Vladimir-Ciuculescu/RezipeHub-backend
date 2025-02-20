import { TokenService } from "./token.service";
import { CreateTokenDto } from "./dtos/create-token.dto";
import { ConfirmTokenDto } from "./dtos/confirm-token.dto";
import { SendResetEmailDto } from "../public/users/dtos/send-reset-email.dto";
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    confirmToken(body: ConfirmTokenDto): Promise<{
        message: string;
    }>;
    resendToken(query: CreateTokenDto): Promise<void>;
    sendResetEmail(body: SendResetEmailDto): Promise<void>;
}
