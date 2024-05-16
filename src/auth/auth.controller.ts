import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/public/users/dtos/create-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { RequestUser } from 'src/public/users/dtos/request-user.dto';
import { Request } from 'express';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/public/users/dtos/user.dto';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UseInterceptors(new SerializeInterceptor(UserDto))
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@CurrentUser() user: RequestUser) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@CurrentUser() user: RequestUser) {
    return user;
  }

  @UseGuards(RefreshJwtGuard)
  @Get('/refresh')
  async refreshTokens(@Req() req) {
    return this.authService.refreshTokens(req.user, req.user.refreshToken);
  }
}
