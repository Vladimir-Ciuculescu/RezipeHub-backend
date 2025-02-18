import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<{
        id: number;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        password: string;
        photoUrl: string;
        bio: string;
        isVerified: boolean;
        refreshToken: string;
        createdAt: Date;
        updatedtAt: Date;
    }>;
}
export {};
