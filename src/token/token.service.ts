import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { generateOtpToken } from 'src/utils/generateToken';
import * as moment from 'moment';
import { CreateTokenDto } from './dtos/create-token.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async generateToken(token: string, payload: CreateTokenDto) {
    const { userId } = payload;

    try {
      await this.prismaService.token.create({
        data: {
          userId,
          token,
          expiresAt: moment().add(24, 'hours').toDate(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async resendToken(payload: CreateTokenDto) {
    const { userId, email } = payload;

    try {
      await this.prismaService.token.deleteMany({ where: { userId } });
      const token = generateOtpToken();

      await this.generateToken(token, payload);

      await this.emailService.sendMail(
        email,
        process.env.MAILTRAP_SENDER,
        `Verification Token - YumHub (${token})`,
        `Hello,

You recently requested to resend the verification token for your account. Please use the following 4-digit token to verify your email address:

Verification Token: ${token}

This token is valid for 24 hours. If you did not request this verification, please ignore this email.

Thank you for using our service!

Best regards,
Your App Name Team`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
