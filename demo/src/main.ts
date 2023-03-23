import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session'; // session
import * as cors from 'cors'; // 跨域
import { NestExpressApplication } from '@nestjs/platform-express';

import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { response } from './common/response';

// 全局拦截（中间件）
function middlewareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  if (req.originalUrl.split('?')[0] === '/user') {
    next();
  } else {
    res.send({
      code: 403,
      message: '拦截掉',
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'image'), {
    prefix: '/images',
  });
  app.use(cors());
  app.use(
    session({
      secret: 'zs', // 生成服务端session签名 加盐
      name: 'token1', // 生成客户端cookie名字默认connect sid
      cookie: {
        httpOnly: true,
        maxAge: 30000,
      }, // 设置返回到前端key属性，默认值为{path: '/', httpOnly: true,secure: false, maxAge: null}
      rolling: true, // 每次请求强行设置cookie, 重置cookie过期时间（默认false）
    }),
  );

  // app.use(middlewareAll); // 拦截
  app.useGlobalInterceptors(new response());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(8000);
}
bootstrap();
