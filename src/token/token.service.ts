import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { generateToken } from 'src/utils/generateToken';
import * as moment from 'moment';
import { CreateTokenDto } from './dtos/create-token.dto';
import { EmailService } from 'src/email/email.service';
import { ConfirmTokenDto } from './dtos/confirm-token.dto';
import { UsersService } from 'src/public/users/users.service';
import { TokenType } from 'types/enums';
import { SendResetEmailDto } from 'src/public/users/dtos/send-reset-email.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async generateToken(token: string, payload: CreateTokenDto) {
    const { userId } = payload;

    try {
      await this.prismaService.tokens.create({
        data: {
          userId,
          token,
          type: TokenType.ACCOUNT_VERIFICATION,
          expiresAt: moment().add(24, 'hours').toDate(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async generateResetPasswordToken(body: SendResetEmailDto) {
    const { email } = body;

    try {
      const user = await this.prismaService.users.findFirst({
        where: { email },
      });

      if (!user) {
        throw new HttpException(
          { error: 'User not found !' },
          HttpStatus.CONFLICT,
        );
      }

      await this.prismaService.tokens.deleteMany({
        where: {
          AND: [{ userId: user.id }, { type: TokenType.PASSWORD_RESET }],
        },
      });

      const newToken = generateToken(6);

      await this.prismaService.tokens.create({
        data: {
          userId: user.id,
          token: newToken,
          type: TokenType.PASSWORD_RESET,
          expiresAt: moment().add(1, 'hours').toDate(),
        },
      });

      await this.emailService.sendMail(
        email,
        process.env.MAILTRAP_SENDER,
        `YumHub - Password Resest`,
        `Hello,

We received a request to reset your password for your account associated with this email address. If you did not make this request, you can ignore this email.

To reset your password, please use the following 6-digit token: ${newToken}


This token is valid for the next 1 hour. If it expires, you will need to request a new password reset token.


Thank you,
YumHub`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async confirmToken(payload: ConfirmTokenDto) {
    const { userId, token } = payload;

    const tokenObj = await this.prismaService.tokens.findFirst({
      where: { userId, type: TokenType.ACCOUNT_VERIFICATION },
    });

    if (!tokenObj) {
      throw new HttpException(
        { error: 'Token not found or expired !' },
        HttpStatus.CONFLICT,
      );
    }

    const now = new Date();

    if (tokenObj.token !== token || tokenObj.expiresAt < now) {
      throw new HttpException(
        { error: 'Token not found or expired !' },
        HttpStatus.CONFLICT,
      );
    }

    await this.usersService.validateUser(userId);

    await this.deleteToken(tokenObj.id);

    return { message: 'User validated !' };
  }

  async resendToken(payload: CreateTokenDto) {
    const { userId, email } = payload;

    try {
      await this.prismaService.tokens.deleteMany({
        where: { userId, type: TokenType.ACCOUNT_VERIFICATION },
      });
      const token = generateToken(4);

      await this.generateToken(token, payload);

      await this.emailService.sendMail(
        email,
        process.env.MAILTRAP_SENDER,
        `YumHub - Token Validation (${token})`,
        `Hello,

You recently requested to resend the verification token for your account. Please use the following 4-digit token to verify your email address:

Verification Token: ${token}

This token is valid for 24 hours. If you did not request this verification, please ignore this email.

Thank you for using our service!

Best regards,
YumHub`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteToken(tokenId: number) {
    try {
      await this.prismaService.tokens.delete({
        where: { id: tokenId, type: TokenType.ACCOUNT_VERIFICATION },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
