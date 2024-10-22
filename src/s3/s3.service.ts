import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DeleteImageRecipeFromS3Dto, DeleteProfileImageFromS3Dto } from "./s3.dtos";

@Injectable()
export class S3Service {
  private bucket = process.env.S3_BUCKET;
  private region = process.env.S3_REGION;

  constructor(private readonly s3Client: S3Client) {
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
    });
  }

  async uploadImage(file: Express.Multer.File, buffer: Buffer, path: string) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,

          Key: path,
          Body: buffer,
          ContentType: file.mimetype,
          ACL: "public-read",
        }),
      );

      const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${path}`;

      return {
        url,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async removeRecipeImage(payload: DeleteImageRecipeFromS3Dto) {
    const { recipeId, userId } = payload;

    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: `users/${userId}/recipes/${recipeId}/images`,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async removeProfileImage(payload: DeleteProfileImageFromS3Dto) {
    const { userId } = payload;

    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: `users/${userId}/profile`,
        }),
      );
    } catch (error) {
      console.log(error);
      throw new HttpException({ error: "Error during removing profile picture !" }, HttpStatus.BAD_GATEWAY);
    }
  }
}
