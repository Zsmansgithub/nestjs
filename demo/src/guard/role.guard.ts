import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core"
import type { Request } from 'express'

// 守卫在中间件之后拦截器管道之前
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.Reflector.get<string[]>('role', context.getHandler())
    const req = context.switchToHttp().getRequest<Request>()
    console.log('req', req.query)
    const role = req.query.role
    console.log('admin', admin)
    console.log('经过了守卫');
    let res = false;
    if (admin instanceof Array && role) {
      console.log('admin111', admin)
      res = (admin as Array<string>).includes(role.toString());
    }
    return res
  }
}
