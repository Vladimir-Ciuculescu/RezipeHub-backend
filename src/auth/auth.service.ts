import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/public/users/dtos/create-user.dto';
import { UsersService } from 'src/public/users/users.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma.service';
import { UserRequestDto } from 'src/public/users/dtos/user-request.dto';
import { SocialUserRequestDto } from 'src/public/users/dtos/social-user-request.dto';
import { ResetPasswordRequestDto } from 'src/public/users/dtos/reset-password-request.dto';
import { TokenType } from 'types/enums';
import { hashPassword } from 'src/utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUser(email);

    if (!user) {
      return null;
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return null;
    }

    return user;
  }

  async login(user: UserRequestDto) {
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const { accessToken, refreshToken } = await this.generateTokens(payload);

    await this.updateRefreshToken(user.id, refreshToken);

    return {
      user: { ...payload },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async socialLogin(user: SocialUserRequestDto) {
    const { email, provider, providerUserId, firstName, lastName } = user;

    let payload;

    const existentUser = await this.prismaService.users.findFirst({
      where: { email: email },
    });

    //! : Possible need to change findFirst method
    if (existentUser) {
      const existentAuthMethod =
        await this.prismaService.auth_methods.findFirst({
          where: { AND: [{ userId: existentUser.id }, { provider: provider }] },
        });

      if (existentAuthMethod) {
        await this.prismaService.auth_methods.updateMany({
          where: { AND: [{ userId: existentUser.id }, { provider: provider }] },
          data: { providerId: providerUserId },
        });
      } else {
        await this.prismaService.auth_methods.create({
          data: {
            userId: existentUser.id,
            provider: provider,
            providerId: providerUserId,
          },
        });
      }

      const { id, email, firstName, lastName } = existentUser;

      payload = {
        email: email,
        id: id,
        firstName: firstName,
        lastName: lastName,
      };
    } else {
      const newUser = await this.prismaService.users.create({
        data: { email: email, firstName: firstName, lastName: lastName },
      });

      await this.prismaService.auth_methods.create({
        data: {
          provider: provider,
          providerId: providerUserId,
          userId: newUser.id,
        },
      });

      payload = {
        email: newUser.email,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      };
    }
    const { accessToken, refreshToken } = await this.generateTokens(payload);

    return {
      user: { ...payload },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async resetPassword(payload: ResetPasswordRequestDto) {
    const { email, token, password } = payload;

    const user = await this.prismaService.users.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new HttpException(
        { error: 'User not found !' },
        HttpStatus.NOT_FOUND,
      );
    }

    const storedToken = await this.prismaService.tokens.findFirst({
      where: { AND: [{ userId: user.id }, { type: TokenType.PASSWORD_RESET }] },
    });

    const now = new Date();

    if (
      !storedToken ||
      storedToken.token !== token ||
      storedToken.expiresAt < now
    ) {
      throw new HttpException(
        { error: 'Token not valid or expired' },
        HttpStatus.NOT_FOUND,
      );
    }

    const hashedPassword = await hashPassword(password);

    await this.prismaService.users.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await this.prismaService.tokens.deleteMany({
      where: { AND: [{ userId: user.id }, { type: TokenType.PASSWORD_RESET }] },
    });
  }

  async refreshTokens(data, oldRefreshToken: string) {
    const user = await this.prismaService.users.findUnique({
      where: { id: data.id },
    });

    if (!user || !user.refreshToken) {
      throw new BadGatewayException();
    }

    const isMatchRefreshToken = await bcrypt.compare(
      oldRefreshToken,
      user.refreshToken,
    );

    if (!isMatchRefreshToken) {
      throw new NotFoundException();
    }

    const payload = {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    const { accessToken, refreshToken } = await this.generateTokens(payload);

    await this.updateRefreshToken(data.id, refreshToken);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async createUser(body: CreateUserDto) {
    const user = await this.usersService.createUser(body);

    return user;
  }

  async generateTokens(payload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, { expiresIn: '10m' }),
      this.jwtService.sign(payload, { expiresIn: '30d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);

    await this.prismaService.users.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedToken,
      },
    });
  }
}
