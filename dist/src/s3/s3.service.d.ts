/// <reference types="multer" />
/// <reference types="node" />
import { S3Client } from "@aws-sdk/client-s3";
import { DeleteImageRecipeFromS3Dto, DeleteProfileImageFromS3Dto } from "./s3.dtos";
export declare class S3Service {
    private readonly s3Client;
    private bucket;
    private region;
    constructor(s3Client: S3Client);
    uploadImage(file: Express.Multer.File, buffer: Buffer, path: string): Promise<{
        url: string;
    }>;
    removeRecipeImage(payload: DeleteImageRecipeFromS3Dto): Promise<void>;
    removeProfileImage(payload: DeleteProfileImageFromS3Dto): Promise<void>;
}
