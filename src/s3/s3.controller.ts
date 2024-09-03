import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteImageRecipeFromS3Dto } from './s3.dtos';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
    @Body('id') id: string,
  ) {
    return this.s3Service.uploadImage(file, userId, id, file.buffer);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Delete('/delete')
  deleteImage(@Body() body: DeleteImageRecipeFromS3Dto) {
    return this.s3Service.removeImage(body);
  }
}
