import { Strategy } from "passport-jwt";
import { UserRequestDto } from "../../public/users/dtos/user-request.dto";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(user: UserRequestDto): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    }>;
}
export {};
