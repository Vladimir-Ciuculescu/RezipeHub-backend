import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/public/users/dtos/create-user.dto";
import { UserRequestDto } from "src/public/users/dtos/user-request.dto";
import { SocialUserRequestDto } from "src/public/users/dtos/social-user-request.dto";
import { ResetPasswordRequestDto } from "src/public/users/dtos/reset-password-request.dto";
import { UserLoginDto } from "src/public/users/dtos/user-login.dto";
import { UserLogoutDto } from "src/public/users/dtos/user-logout.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    findAll(request: Request): string;
    registerUser(body: CreateUserDto): Promise<{
        id: number;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        password: string;
        photoUrl: string;
        bio: string;
        isVerified: boolean;
        refreshToken: string;
        createdAt: Date;
        updatedtAt: Date;
    }>;
    loginUser(user: UserRequestDto, body: UserLoginDto): Promise<{
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            photoUrl: string;
            bio: string;
            isVerified: string;
        };
        access_token: string;
        refresh_token: string;
    }>;
    socialLoginUser(body: SocialUserRequestDto): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    resetPassword(body: ResetPasswordRequestDto): Promise<void>;
    getProfile(user: UserRequestDto): UserRequestDto;
    refreshTokens(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logOut(body: UserLogoutDto): Promise<void>;
}
