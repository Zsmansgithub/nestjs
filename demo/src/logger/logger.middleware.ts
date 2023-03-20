import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('logger middleware');
    // console.log(req);
    // res.send('拦截'); // 拦截掉了不走next
    next(); // send 和next不能一起写
  }
}
