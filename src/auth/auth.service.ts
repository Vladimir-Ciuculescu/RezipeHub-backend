import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/public/users/dtos/create-user.dto';
import { UsersService } from 'src/public/users/users.service';
import * as bcrypt from 'bcrypt';
import { RequestUser } from 'src/public/users/dtos/request-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
