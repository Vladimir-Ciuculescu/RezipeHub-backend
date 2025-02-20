/// <reference types="multer" />
import { CreateUserDto } from "./dtos/create-user.dto";
import { EditProfileDto, GetProfileDto } from "./users.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma.service";
import { EmailService } from "../../email/email.service";
import { TokenService } from "../../token/token.service";
import { S3Service } from "../../s3/s3.service";
export declare class UsersService {
    private readonly prismaService;
    private readonly emailService;
    private readonly tokenService;
    private readonly jwtService;
    private readonly s3Service;
    constructor(prismaService: PrismaService, emailService: EmailService, tokenService: TokenService, jwtService: JwtService, s3Service: S3Service);
    findUser(email: string): Promise<{
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
    validateUser(userId: number): Promise<void>;
    getProfile(payload: GetProfileDto): Promise<string>;
    updateProfile(file: Express.Multer.File, body: EditProfileDto): Promise<string>;
}
