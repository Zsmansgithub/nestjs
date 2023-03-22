import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 文件保存
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file) {
    console.log('file', file);
    return {
      code: 200,
      message: '成功'
    };
  }

  // 文件下载
  @Get('down')
  download(@Res() res: Response) {
    const url = join(__dirname, '../image/1679492273020.png');
    return res.download(url);
  }
  // 文件下载流
  @Get('stream')
  async downloadStream(@Res() res: Response) {
    const url = join(__dirname, '../image/1679492273020.png');
    const stream = new zip.Stream();
    await stream.addEntry(url);
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment;filename=zs');
    stream.pipe(res)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
