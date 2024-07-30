import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { S3Client } from '@aws-sdk/client-s3';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  // imports: [
  //   ThrottlerModule.forRoot([
  //     {
  //       ttl: 60000,
  //       limit: 3,
  //     },
  //   ]),
  // ],
  controllers: [S3Controller],
  providers: [
    S3Service,
    S3Client,
    // { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class S3Module {}
