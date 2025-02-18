import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/public/users/users.service";
import { PrismaService } from "src/prisma.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshJwtStrategy } from "./strategies/refresh-jwt.strategy";
import { EmailService } from "src/email/email.service";
import { TokenService } from "src/token/token.service";
import { S3Service } from "src/s3/s3.service";
import { S3Client } from "@aws-sdk/client-s3";
import { DevicesService } from "src/devices/devices.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],

  providers: [
    AuthService,
    UsersService,
    EmailService,
    PrismaService,
    TokenService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    UsersService,
    S3Service,
    S3Client,
    DevicesService,
  ],
})
export class AuthModule {}
