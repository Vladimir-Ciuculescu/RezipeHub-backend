import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './public/users/users.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, EmailModule],
})
export class AppModule {}
