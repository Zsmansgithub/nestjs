import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';
import { ApidemoModule } from './apidemo/apidemo.module';
import { ListModule } from './list/list.module';
import { BasicModule } from './basic/basic.module';
import { ConfigModule } from './config/config.module' ;
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { CrawlerModule } from './crawler/crawler.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DbtestModule } from './dbtest/dbtest.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '87654312',
      port: 3306,
      database: 'db', // 库名
      // entities: [__dirname+'/**/*.entity{.js,.ts}'], // 实体文件（autoLoadEntities自动加载了）
      synchronize: true, // 是否将实体类同步到数据库
      retryDelay: 500, // 重试链接数据库间隔
      retryAttempts: 10, // 重试次数
      autoLoadEntities: true // 自动加载实体 forFeature() 方法 注册的每个实体都将自动添加到配置对象的实体
    }),
    UserModule,
    ApidemoModule,
    ListModule, // 模块需导出后（exports）才能在别处引用使用 默认只能在模块内部(controller)使用
    BasicModule, // 全局模块注册
    ConfigModule.aaa({ path: 'aaa' }), UploadModule, LoginModule, CrawlerModule, GuardModule, DbtestModule, PokemonModule, // 调用ConfigModule类静态方法 传入参数动态返回module
  ], // BasicModule 全局模块
  controllers: [AppController],
  // providers: [AppService],
  providers: [
    AppService2,
    {
      provide: 'ABC', // 别名
      useClass: AppService,
    },
    {
      provide: 'Test', // 自定义值
      useValue: ['TB', 'PDD', 'JD'],
    },
    {
      provide: 'factory',
      inject: [AppService2],
      useFactory(AppService2: AppService2) {
        console.log('factory', AppService2.getHello());
        return 333;
      },
    },
    {
      provide: 'factoryAsync',
      inject: [AppService2],
      async useFactory(AppService2: AppService2) {
        console.log('factoryAsync', AppService2.getHello());
        return await new Promise((resolve, reject) => {
          // 计时结束前页面访问服务无法访问（整个项目都在走异步等待？和视频不一致）
          setTimeout(() => {
            resolve(AppService2.getHello());
          }, 5000);
        });
      },
    },
  ],
})
export class AppModule {}
