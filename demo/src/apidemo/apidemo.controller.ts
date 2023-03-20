import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Query,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { ApidemoService } from './apidemo.service';
import { CreateApidemoDto } from './dto/create-apidemo.dto';
import { UpdateApidemoDto } from './dto/update-apidemo.dto';

@Controller('apidemo')
export class ApidemoController {
  constructor(private readonly apidemoService: ApidemoService) {}

  @Get()
  // findAll(@Query() query) {
  //   return {
  //     code: 200,
  //     message: query.name,
  //   };
  // }
  findAll(@Query('name') name) {
    console.log(name);
    return {
      code: 200,
      message: name,
    };
  }

  @Post()
  create(@Body('name') name) {
    return {
      code: 200,
      message: name,
    };
  }

  // @Get(':id')
  // findId(@Request() req) {
  //   return {
  //     code: 200,
  //     id: req.params.id,
  //   };
  // }
  @Get(':id')
  // @HttpCode(403)
  findId(@Param('id') id, @Headers() headers) {
    console.log(headers);
    return {
      code: 200,
      id: id,
    };
  }
}
