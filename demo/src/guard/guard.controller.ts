import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role.guard'
import { Role, ReqUrl } from './role/role.decorator'
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('guard')
@ApiTags('守卫接口')
@ApiBearerAuth() // token验证
// 守卫
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) { }

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @ApiOperation({summary:'get admin权限',description: 'admin权限限制自定义装饰器守卫'})
  @ApiParam({name: 'role', description: '权限code', required: false})
  @ApiQuery({name: 'role', description: '权限code', required: true})
  @ApiResponse({
    status: 403,
    schema: {example: {name: 'aaa', age: 111}},
    description: '没有权限'
  })
  // 守卫
  // @SetMetadata('role', ['admin'])
  // 自定义装饰器
  @Role('admin')
  findAll(@ReqUrl('321') url: string) {
    console.log('url', url)
    return this.guardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
