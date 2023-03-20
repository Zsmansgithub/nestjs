import { Module, Global } from '@nestjs/common';

@Global() // 全局注册
@Module({
  providers: [
    {
      provide: 'Basic',
      useValue: { baseUrl: '/basic' },
    },
  ],
  exports: [
    {
      provide: 'Basic',
      useValue: { baseUrl: '/basic' },
    },
  ],
})
export class BasicModule {}
