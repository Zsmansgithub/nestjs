import { Injectable } from '@nestjs/common';
import { CreateDbtestDto } from './dto/create-dbtest.dto';
import { UpdateDbtestDto } from './dto/update-dbtest.dto';
import { Repository, Like } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Dbtest } from './entities/dbtest.entity'

@Injectable()
export class DbtestService {
  constructor(@InjectRepository(Dbtest) private readonly menchar: Repository<Dbtest>) { }
  create(createDbtestDto: CreateDbtestDto) {
    const data = new Dbtest()
    data.spuName = createDbtestDto.spuName
    data.color = createDbtestDto.color
    data.colorCode = createDbtestDto.colorCode
    data.fineCode = createDbtestDto.fineCode
    data.number = createDbtestDto.number
    data.isActive = createDbtestDto.isActive
    return this.menchar.save(data);
  }

  findAll(query: { spuName: string }) {
    console.log(query.spuName)
    return this.menchar.find({
      where: {
        spuName: Like(`%${query.spuName}%`)
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dbtest`;
  }

  update(id: number, updateDbtestDto: UpdateDbtestDto) {
    return `This action updates a #${id} dbtest`;
  }

  remove(id: number) {
    return `This action removes a #${id} dbtest`;
  }
}
