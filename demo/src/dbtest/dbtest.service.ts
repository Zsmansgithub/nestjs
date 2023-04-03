import { Injectable } from '@nestjs/common';
import { CreateDbtestDto } from './dto/create-dbtest.dto';
import { UpdateDbtestDto } from './dto/update-dbtest.dto';
import { Repository, Like } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Dbtest } from './entities/dbtest.entity'
import { Tags } from './entities/tag.entity'

@Injectable()
export class DbtestService {
  constructor(
    @InjectRepository(Dbtest) private readonly menchar: Repository<Dbtest>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>
  ) { }
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

  async createTag(params: { spuName: string, tag: string }) {
    const tagList = params.tag.split(',')
    const tagList1 = []
    const info = await this.menchar.findOne({
      where: {
        spuName: Like(`%${params.spuName}%`)
      },
    })
    tagList.forEach(async (t) => {
      const data1 = new Tags()
      data1.tag = t
      data1.spuName = info // 建立绑定关联管理
      tagList1.push(data1)
      await this.tags.save(data1)
    })
    info.tags = tagList1
    this.menchar.save(info)
    return true;
  }

  async findAll(query: { spuName: string | null, page: number, pageSize: number }) {
    const data = await this.menchar.find({
      relations: ['tags'], // 本例 oneToMany 字段
      where: {
        spuName: Like(`%${query.spuName}%`)
      },
      order: {
        id: 'DESC', // 降序
        spuName: "ASC" // 升序
      },
      skip: (query.page - 1) * query.pageSize, // 0 10 偏移量
      take: query.pageSize // 多少条
    });
    const total = await this.menchar.count({
      where: {
        spuName: Like(`%${query.spuName}%`)
      }
    });
    return { data, total }
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
