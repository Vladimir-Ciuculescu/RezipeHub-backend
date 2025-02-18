import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SerializeInterceptor implements NestInterceptor {
    private readonly Dto;
    constructor(Dto: any);
    intercept(ctx: ExecutionContext, handler: CallHandler): Observable<any>;
}
