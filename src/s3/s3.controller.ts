import { Body, Controller, Delete, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3Service } from "./s3.service";
import { DeleteImageRecipeFromS3Dto } from "./s3.dtos";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post("/upload-image")
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Body("userId") userId: string, @Body("id") id: string) {
    const path = `users/${userId}/recipes/${id}/images`;
    return this.s3Service.uploadImage(file, file.buffer, path);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Delete("/delete")
  deleteImage(@Body() body: DeleteImageRecipeFromS3Dto) {
    return this.s3Service.removeRecipeImage(body);
  }
}
