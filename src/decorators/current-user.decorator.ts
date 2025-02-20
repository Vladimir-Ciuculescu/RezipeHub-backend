import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { UserRequestDto } from "../public/users/dtos/user-request.dto";

declare global {
  namespace Express {
    interface Request {
      //@ts-ignore
      user?: UserRequestDto;
    }
  }
}

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Request;

  return request.user;
});
