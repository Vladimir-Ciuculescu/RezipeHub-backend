/// <reference types="multer" />
import { EditProfileDto, GetProfileDto } from "./users.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(payload: GetProfileDto): Promise<string>;
    uploadFile(file: Express.Multer.File, body: EditProfileDto): Promise<string>;
}
