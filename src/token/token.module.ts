import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";
import { PrismaService } from "src/prisma.service";
import { EmailService } from "src/email/email.service";
import { UsersService } from "src/public/users/users.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { S3Client } from "@aws-sdk/client-s3";
import { S3Service } from "src/s3/s3.service";
import { DevicesService } from "src/devices/devices.service";

@Module({
  controllers: [TokenController],
  providers: [
    TokenService,
    UsersService,
    EmailService,
    AuthService,
    JwtService,
    PrismaService,
    S3Client,
    S3Service,
    DevicesService,
  ],
})
export class TokenModule {}
