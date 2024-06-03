import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { TokenService } from 'src/token/token.service';

@Module({
  controllers: [UsersController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    JwtService,
    EmailService,
    TokenService,
  ],
})
export class UsersModule {}
