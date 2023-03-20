import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ListService } from './list/list.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(
    @Inject('ABC') private readonly appService: AppService, // 别名（和module provide名称对应）
    @Inject('Test') private readonly shop: string[], // 自定义值
    @Inject('factory') private readonly factory: number, // 工厂模式
    @Inject('factoryAsync') private readonly factoryAsync: number, // 工厂模式
    private readonly ListService: ListService, // 工厂模式
  ) {}

  @Get('/')
  getBase(): string {
    return this.appService.getHello();
  }
  @Get('userList')
  getList(): string {
    return this.ListService.findAll();
  }
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('1')
  getDetail(): string {
    return this.appService.getDetail();
  }
  @Get('shop')
  getShop(): string[] {
    return this.shop;
  }
  @Get('factory')
  getFactory(): number {
    return this.factory;
  }
  @Get('factoryAsync')
  getFactoryAsync(): number {
    return this.factoryAsync;
  }
}
