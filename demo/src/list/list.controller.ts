import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  ParseUUIDPipe
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    @Inject('Basic') private readonly Basic: string,
  ) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  findAll() {
    console.log(this.Basic);
    return this.listService.findAll();
  }

  @Get(':id')
  // 管道转换可用作数据转换或验证等
  // findOne(@Param('id', ParseUUIDPipe) id: number) {
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id)
    return this.listService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
