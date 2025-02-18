import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/email/email.service";
import { TokenService } from "src/token/token.service";
import { S3Service } from "src/s3/s3.service";
import { S3Client } from "@aws-sdk/client-s3";
import { DevicesService } from "src/devices/devices.service";

@Module({
  controllers: [UsersController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    JwtService,
    EmailService,
    TokenService,
    S3Service,
    S3Client,
    DevicesService,
  ],
})
export class UsersModule {}
