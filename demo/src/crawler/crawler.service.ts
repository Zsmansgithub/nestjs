import { Injectable } from '@nestjs/common';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import axios from 'axios';
@Injectable()
export class CrawlerService {
  async findAll() {
    const urls: string[] = []
    const baseUrl = 'https://www.xgmn02.com';
    let index = 0
    const getCosplay = async (idx) => {
      const url = `https://www.xgmn02.com/LEGBABY/LEGBABY4118${idx ? ('_' + idx) : ''}.html`
      const body = await axios.get(url).then(async res => res.data)
      const $ = cheerio.load(body)
      const page = $('.pagination').eq(0).find('a')
      $('.article-content p img').each(function () {
        urls.push(baseUrl + $(this).attr('src'))
      })

      const pageArrsy = page.map(function () {
        return $(this).text()
      }).toArray();
      if (pageArrsy.includes('下一页')) {
        await getCosplay(++index)
      }
    };
    await getCosplay(null)
    console.log(urls)
    this.whiteFile(urls, 'LEGBABY4118')
    return 'cos'
  }

  whiteFile(urls: string[], dir: string) {
    const baseDir = '../babes/'
    const dirI = baseDir + dir
    const basDir = path.join(__dirname, baseDir)
    // 判断文件夹是否存在 否则创建
    if (!fs.existsSync(basDir)) {
      fs.mkdirSync(basDir);
    }
    const basDir1 = path.join(__dirname, dirI)
    if(!fs.existsSync(basDir1)) {
      fs.mkdirSync(basDir1);
    }
    // 请求文件 写入
    urls.forEach(async url => {
      const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(res => res.data)
      const ws = fs.createWriteStream(path.join(__dirname, dirI, Date.now() + '.jpg'))
      ws.write(buffer)
    });
  }
}
