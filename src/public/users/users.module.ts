import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [AuthService, UsersService, PrismaService, JwtService],
})
export class UsersModule {}
