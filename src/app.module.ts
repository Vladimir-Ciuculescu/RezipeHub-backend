import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './public/users/users.module';
import { EmailModule } from './email/email.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, EmailModule, TokenModule],
})
export class AppModule {}
