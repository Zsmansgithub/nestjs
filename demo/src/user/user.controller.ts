import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { version } from 'os';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
// 版本控制
// @Controller({
//   path: 'user',
//   version: '1',
// })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // 单独版本控制
  // @Version('1')
  findAll() {
    return this.userService.findAll();
  }

  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4, // 生成几个验证码
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
  @Post('create')
  createUser(@Body() body, @Session() session) {
    console.log(body);
    console.log(session.code);
    let codeS = '';
    if (session.code.toLocaleLowerCase() === body.code.toLocaleLowerCase()) {
      codeS = '验证码正确';
    } else {
      codeS = '验证码错误';
    }
    return {
      code: 200,
      message: codeS,
    };
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
