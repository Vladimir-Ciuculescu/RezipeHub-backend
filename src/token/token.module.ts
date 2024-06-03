import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { PrismaService } from 'prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [TokenController],
  providers: [TokenService, EmailService, PrismaService],
})
export class TokenModule {}
