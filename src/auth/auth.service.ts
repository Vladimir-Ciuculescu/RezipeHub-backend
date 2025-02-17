import {
  BadGatewayException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/public/users/dtos/create-user.dto";
import { UsersService } from "src/public/users/users.service";
import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma.service";
import { UserRequestDto } from "src/public/users/dtos/user-request.dto";
import { SocialUserRequestDto } from "src/public/users/dtos/social-user-request.dto";
import { ResetPasswordRequestDto } from "src/public/users/dtos/reset-password-request.dto";
import { TokenType } from "types/enums";
import { hashPassword } from "src/utils/hashPassword";
import { DevicesService } from "src/devices/devices.service";
import { AddDeviceDto } from "src/devices/devices.dto";
import { UserLogoutDto } from "src/public/users/dtos/user-logout.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly devicesService: DevicesService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findUser(email);

      if (!user) {
        return null;
      }

      const isMatchPassword = await bcrypt.compare(password, user.password);

      if (!isMatchPassword) {
        return null;
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException({ error: "Error validating user " }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: UserRequestDto) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      bio: user.bio,
      isVerified: user.isVerified,
    };

    const { accessToken, refreshToken } = await this.generateTokens(payload);

    await this.updateRefreshToken(user.id, refreshToken);

    const devicePayload: AddDeviceDto = {
      userId: user.id,
      deviceToken: user.deviceToken,
      deviceType: user.platform,
    };

    await this.devicesService.addDeviceToken(devicePayload);

    return {
      user: { ...payload },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async socialLogin(user: SocialUserRequestDto) {
    const { email, provider, providerUserId, firstName, lastName, deviceToken, platform } = user;

    let payload;

    let userId;

    const existentUser = await this.prismaService.users.findFirst({
      where: { email: email },
    });

    //! : Possible need to change findFirst method
    if (existentUser) {
      userId = existentUser.id;
      const existentAuthMethod = await this.prismaService.auth_methods.findFirst({
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

      const { id, email, firstName, lastName, photoUrl, bio, isVerified } = existentUser;

      payload = {
        id,
        email,
        firstName,
        lastName,
        photoUrl,
        bio,
        isVerified,
      };
    } else {
      const newUser = await this.prismaService.users.create({
        data: { email: email, firstName: firstName, lastName: lastName },
      });

      userId = newUser.id;

      await this.prismaService.auth_methods.create({
        data: {
          provider: provider,
          providerId: providerUserId,
          userId: newUser.id,
        },
      });

      payload = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        photoUrl: newUser.photoUrl,
        bio: newUser.bio,
        isVerified: newUser.isVerified,
      };
    }
    const { accessToken, refreshToken } = await this.generateTokens(payload);

    await this.updateRefreshToken(userId, refreshToken);

    const devicePayload: AddDeviceDto = {
      userId,
      deviceToken,
      deviceType: platform,
    };

    //* Register expo push token
    await this.devicesService.addDeviceToken(devicePayload);

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
      throw new HttpException({ error: "User not found !" }, HttpStatus.NOT_FOUND);
    }

    const storedToken = await this.prismaService.tokens.findFirst({
      where: { AND: [{ userId: user.id }, { type: TokenType.PASSWORD_RESET }] },
    });

    const now = new Date();

    if (!storedToken || storedToken.token !== token || storedToken.expiresAt < now) {
      throw new HttpException({ error: "Token not valid or expired" }, HttpStatus.NOT_FOUND);
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
      // throw new BadGatewayException();
      throw new ForbiddenException();
    }

    const isMatchRefreshToken = await bcrypt.compare(oldRefreshToken, user.refreshToken);

    if (!isMatchRefreshToken) {
      //throw new
      throw new BadGatewayException();
    }

    const payload = {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
      bio: data.bio,
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
      this.jwtService.sign(payload, { expiresIn: "10m" }),
      this.jwtService.sign(payload, { expiresIn: "30d" }),
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

  async logOut(body: UserLogoutDto) {
    const { id, expoPushToken } = body;

    try {
      await this.prismaService.users.update({ where: { id: id }, data: { refreshToken: null } });

      if (expoPushToken) {
        await this.prismaService.user_devices.updateMany({
          where: {
            AND: [{ userId: id }, { deviceToken: expoPushToken }],
          },
          data: {
            deviceToken: null,
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException({ error: "Error logging out user" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
