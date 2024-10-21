import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DeleteImageRecipeFromS3Dto } from "./s3.dtos";

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

  async uploadImage(file: Express.Multer.File, userId: string, id: string, buffer: Buffer) {
    const path = `users/${userId}/recipes/${id}/images`;

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
}
