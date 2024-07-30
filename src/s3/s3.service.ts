import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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

  async uploadImage(file: Express.Multer.File, buffer: Buffer) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: file.originalname,
          Body: buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }),
      );

      const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${file.originalname}`;

      return {
        url,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
