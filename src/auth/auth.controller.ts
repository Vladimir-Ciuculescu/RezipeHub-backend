import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/public/users/dtos/create-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { RequestUser } from 'src/public/users/dtos/request-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
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
}
