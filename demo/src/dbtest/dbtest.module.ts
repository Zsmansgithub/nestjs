import { Module } from '@nestjs/common';
import { DbtestService } from './dbtest.service';
import { DbtestController } from './dbtest.controller';
import { Dbtest } from './entities/dbtest.entity';
import { Tags } from './entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dbtest, Tags])],
  controllers: [DbtestController],
  providers: [DbtestService]
})
export class DbtestModule { }
