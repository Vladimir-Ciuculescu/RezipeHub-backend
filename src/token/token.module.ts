import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";

import { JwtService } from "@nestjs/jwt";
import { S3Client } from "@aws-sdk/client-s3";
import { UsersService } from "../public/users/users.service";
import { EmailService } from "../email/email.service";
import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../prisma.service";
import { S3Service } from "../s3/s3.service";
import { DevicesService } from "../devices/devices.service";

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
