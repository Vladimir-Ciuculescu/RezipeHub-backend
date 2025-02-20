import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

import { JwtService } from "@nestjs/jwt";

import { S3Client } from "@aws-sdk/client-s3";
import { EmailService } from "../../email/email.service";
import { TokenService } from "../../token/token.service";
import { S3Service } from "../../s3/s3.service";
import { DevicesService } from "../../devices/devices.service";
import { AuthService } from "../../auth/auth.service";
import { PrismaService } from "../../prisma.service";

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
