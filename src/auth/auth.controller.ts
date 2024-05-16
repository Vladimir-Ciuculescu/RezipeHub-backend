import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/public/users/dtos/user.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  @UseInterceptors(new SerializeInterceptor(UserDto))
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  loginUser(@CurrentUser() user: RequestUser) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('/profile')
  getProfile(@CurrentUser() user: RequestUser) {
    return user;
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(201)
  @Get('/refresh')
  async refreshTokens(@Req() req) {
    return this.authService.refreshTokens(req.user, req.user.refreshToken);
  }
}
