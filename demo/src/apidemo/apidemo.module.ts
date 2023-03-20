import { Module } from '@nestjs/common';
import { ApidemoService } from './apidemo.service';
import { ApidemoController } from './apidemo.controller';

@Module({
  controllers: [ApidemoController],
  providers: [ApidemoService]
})
export class ApidemoModule {}
