import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";
import { PrismaService } from "prisma.service";
import { EmailService } from "src/email/email.service";
import { UsersService } from "src/public/users/users.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [TokenController],
  providers: [TokenService, UsersService, EmailService, AuthService, JwtService, PrismaService],
})
export class TokenModule {}
