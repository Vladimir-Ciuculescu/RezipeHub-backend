import { Body, Controller, Get, HttpCode, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { EditProfileDto, GetProfileDto } from "./users.dto";
import { UsersService } from "./users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

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
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: EditProfileDto) {
    return this.usersService.updateProfile(file, body);
  }
}
