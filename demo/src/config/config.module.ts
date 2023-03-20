import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

type opt = {
  path: string;
};

@Module({})
export class ConfigModule {
  // 定义类静态方法 动态返回模块
  static aaa(options: opt): DynamicModule {
    console.log(options);
    return {
      module: ConfigModule,
      controllers: [ConfigController],
      providers: [ConfigService],
    };
  }
}
