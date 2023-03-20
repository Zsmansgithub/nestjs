import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { logger } from './../logger/logger.middleware';
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(logger).forRoutes('user'); // 字符串
    consumer.apply(logger).forRoutes({
      path: 'user',
      method: RequestMethod.POST,
    }); // 对象配置
    consumer.apply(logger).forRoutes(UserController); // 控制器
  }
}
