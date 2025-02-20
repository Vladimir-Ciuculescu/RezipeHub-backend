import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { UserRequestDto } from "../public/users/dtos/user-request.dto";
import { UsersService } from "../public/users/users.service";
import { CreateUserDto } from "../public/users/dtos/create-user.dto";
import { DevicesService } from "../devices/devices.service";
import { SocialUserRequestDto } from "../public/users/dtos/social-user-request.dto";
import { ResetPasswordRequestDto } from "../public/users/dtos/reset-password-request.dto";
import { UserLogoutDto } from "../public/users/dtos/user-logout.dto";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly prismaService;
    private readonly devicesService;
    constructor(usersService: UsersService, jwtService: JwtService, prismaService: PrismaService, devicesService: DevicesService);
    validateUser(email: string, password: string): Promise<{
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
    login(user: UserRequestDto): Promise<{
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
    socialLogin(user: SocialUserRequestDto): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    resetPassword(payload: ResetPasswordRequestDto): Promise<void>;
    refreshTokens(data: any, oldRefreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    createUser(body: CreateUserDto): Promise<{
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
    generateTokens(payload: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    logOut(body: UserLogoutDto): Promise<void>;
}
