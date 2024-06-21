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
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/public/users/dtos/user.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { UserRequestDto } from 'src/public/users/dtos/user-request.dto';
import { SocialUserRequestDto } from 'src/public/users/dtos/social-user-request.dto';
import { ResetPasswordRequestDto } from 'src/public/users/dtos/reset-password-request.dto';

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
  loginUser(@CurrentUser() user: UserRequestDto) {
    return this.authService.login(user);
  }

  @HttpCode(200)
  @Post('/social-login')
  socialLoginUser(@Body() body: SocialUserRequestDto) {
    return this.authService.socialLogin(body);
  }

  @HttpCode(200)
  @Post('/reset-password')
  resetPassword(@Body() body: ResetPasswordRequestDto) {
    return this.authService.resetPassword(body);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('/profile')
  getProfile(@CurrentUser() user: UserRequestDto) {
    return user;
  }

  // * Refresh the token
  @UseGuards(RefreshJwtGuard)
  @HttpCode(201)
  @Get('/refresh')
  async refreshTokens(@Req() req) {
    return this.authService.refreshTokens(req.user, req.user.refreshToken);
  }
}
