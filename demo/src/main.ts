import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { Reflector } from "@nestjs/core"
import { AppModule } from './app.module';
import * as session from 'express-session'; // session
import * as cors from 'cors'; // 跨域
import { NestExpressApplication } from '@nestjs/platform-express';

import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { response } from './common/response'; // 
import { RoleGuard } from './guard/role.guard'; // 守卫全局引入
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


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
  // token title 描述 版本
  const options = new DocumentBuilder().addBearerAuth().setTitle('swagger-demo').setDescription('swagger-document-demo').setVersion('1.0.0').build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-nestjs', app, document)

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
  // 全局守卫
  app.useGlobalGuards(new RoleGuard(new Reflector()))
  // 管道验证（nestjs 内置）
  app.useGlobalPipes(new ValidationPipe())
  // app.use(middlewareAll); // 拦截
  app.useGlobalInterceptors(new response());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(9527);
}
bootstrap();
