import { Request } from 'express';
import { Strategy } from 'passport-jwt';
declare const RefreshJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    constructor();
    validate(req: Request, payload: any): Promise<{
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        refreshToken: string;
    }>;
}
export {};
