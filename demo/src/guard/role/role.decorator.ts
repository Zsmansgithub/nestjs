import { SetMetadata, createParamDecorator, ExecutionContext, applyDecorators } from '@nestjs/common';
import type { Request } from 'express';

export const Role = (...args: string[]) => SetMetadata('role', args);

export const ReqUrl = createParamDecorator((data: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>()
    console.log('data', data)
    // console.log('req', req)

    // return applyDecorators(Role, xxx, xxx) // 多个装饰器聚合
    return req.url
});
