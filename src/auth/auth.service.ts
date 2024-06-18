import {
  BadGatewayException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/public/users/dtos/create-user.dto';
import { UsersService } from 'src/public/users/users.service';
import * as bcrypt from 'bcrypt';
import { RequestUser } from 'src/public/users/dtos/request-user.dto';
import { PrismaService } from 'prisma.service';

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

  async login(user: RequestUser) {
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
