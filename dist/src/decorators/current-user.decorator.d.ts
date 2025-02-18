import { UserRequestDto } from "src/public/users/dtos/user-request.dto";
declare global {
    namespace Express {
        interface Request {
            user?: UserRequestDto;
        }
    }
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
