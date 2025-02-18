/// <reference types="multer" />
import { S3Service } from "./s3.service";
import { DeleteImageRecipeFromS3Dto } from "./s3.dtos";
export declare class S3Controller {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    uploadImage(file: Express.Multer.File, userId: string, id: string): Promise<{
        url: string;
    }>;
    deleteImage(body: DeleteImageRecipeFromS3Dto): Promise<void>;
}
