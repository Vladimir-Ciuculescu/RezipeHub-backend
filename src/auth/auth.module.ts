import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "../prisma.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { RefreshJwtStrategy } from "./strategies/refresh-jwt.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { EmailService } from "../email/email.service";
import { TokenService } from "../token/token.service";
import { S3Service } from "../s3/s3.service";
import { DevicesService } from "../devices/devices.service";
import { UsersService } from "../public/users/users.service";

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
    S3Service,
    S3Client,
    DevicesService,
  ],
})
export class AuthModule {}
