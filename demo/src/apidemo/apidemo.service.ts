import { Injectable } from '@nestjs/common';
import { CreateApidemoDto } from './dto/create-apidemo.dto';
import { UpdateApidemoDto } from './dto/update-apidemo.dto';

@Injectable()
export class ApidemoService {
  create(createApidemoDto: CreateApidemoDto) {
    return 'This action adds a new apidemo';
  }

  findAll() {
    return `This action returns all apidemo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apidemo`;
  }

  update(id: number, updateApidemoDto: UpdateApidemoDto) {
    return `This action updates a #${id} apidemo`;
  }

  remove(id: number) {
    return `This action removes a #${id} apidemo`;
  }
}
