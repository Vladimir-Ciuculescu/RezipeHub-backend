import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from 'src/public/users/dtos/request-user.dto';

declare global {
  namespace Express {
    interface Request {
      //@ts-ignore
      user?: RequestUser;
    }
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

    return request.user;
  },
);
