import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { hashPassword } from 'src/utils/hashPassword';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(body: CreateUserDto) {
    const { email, firstName, lastName, password } = body;

    const existentUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existentUser) {
      throw new HttpException(
        {
          error: 'This email address is already in use !',
        },
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    return user;
  }
}
