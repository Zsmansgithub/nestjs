import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';

@Module({
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService], // 模块需导出后（exports）才能在别处引用使用 默认只能在模块内部(controller)使用
})
export class ListModule {}
