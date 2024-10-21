import { Body, Controller, Get, HttpCode, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { EditProfileDto, GetProfileDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  @HttpCode(200)
  getProfile(@Query() payload: GetProfileDto) {
    return this.usersService.getProfile(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put("/update-profile")
  @HttpCode(202)
  updateProfile(payload: EditProfileDto) {
    return this.usersService.updateProfile(payload);
  }
}
