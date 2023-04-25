import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import axios from 'axios';

@Injectable()
export class PokemonService {
  async findAll() {
    const pok = fs.readFileSync(path.join(__dirname, './data.json'), {encoding: 'utf-8'});
    const po = JSON.parse(pok)
    po.forEach(i => {
      delete i.pokemon_region_name
      delete i.pokemon_region_id
    })
    const ar = [
      {
        pokemon_region: 'kanto',
        pokemon_region_name: '关都地区',
      },
      {
        pokemon_region: 'johto',
        pokemon_region_name: '城都地区',
      },
      {
        pokemon_region: 'hoenn',
        pokemon_region_name: '丰缘地区',
      },
      {
        pokemon_region: 'sinnoh',
        pokemon_region_name: '神奥地区',
      },
      {
        pokemon_region: 'unova',
        pokemon_region_name: '合众地区',
      },
      {
        pokemon_region: 'kalos',
        pokemon_region_name: '卡洛斯地区',
      },
      {
        pokemon_region: 'alola',
        pokemon_region_name: '阿罗拉地区',
      },
      {
        pokemon_region: 'galar',
        pokemon_region_name: '伽勒尔地区',
      },
    ]
    let index = 0
    const getCosplay = async () => {
      // const url = `https://www.pokemon.cn/play/pokedex`
      const u = `https://www.pokemon.cn/play/pokedex/api/v1?pokemon_ability_id=&pokemon_region_id[]=${ar[index].pokemon_region}&zukan_id_from=1&zukan_id_to=898`
      const res = await axios.get(u).then(async res => res.data)
      const pokemons = res.pokemons
      pokemons.forEach((v) => {
        const item = po.find(i => i.zukan_id === v.zukan_id && i.pokemon_name == v.pokemon_name && i.zukan_sub_id === v.zukan_sub_id)
        if (item.pokemon_region_id) {
          item.pokemon_region_name = item.pokemon_region_name + ',' + ar[index].pokemon_region_name
          item.pokemon_region_id = item.pokemon_region_id + ',' + ar[index].pokemon_region
        } else {
          item.pokemon_region_name = ar[index].pokemon_region_name
          item.pokemon_region_id = ar[index].pokemon_region
        }
      })
      index++
      if (index < ar.length) {
        await getCosplay()
      }
    };
    await getCosplay()
    fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(po, null, 2), (error) => {
      if (error) {
        console.log('An error has occurred ', error);
        return;
      }
      console.log('Data written successfully to disk');
    });
    return `pokemon`;
  }
  whiteFile(urls: string[]) {
    const baseDir = '../pokedex/'
    const basDir = path.join(__dirname, baseDir)
    // 判断文件夹是否存在 否则创建
    if (!fs.existsSync(basDir)) {
      fs.mkdirSync(basDir);
    }
    // 请求文件 写入
    urls.forEach(async url => {
      const n = url.split('/')[8].split('.')[0]
      const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(res => res.data)
      const ws = fs.createWriteStream(path.join(__dirname, baseDir, n + '.png'));
      ws.write(buffer)
    });
  }
  async findAll1() {
    const baseUrl = 'https://www.pokemon.cn/play/resources/pokedex'

    const pok = fs.readFileSync(path.join(__dirname, './data.json'), {encoding: 'utf-8'});
    const po = JSON.parse(pok)
    const a = po.map(v => baseUrl + v.file_name)
    this.whiteFile(a);
    // const a = po.map(v => {
    //   return {
    //     n: v.pokemon_region_name,
    //     id: v.pokemon_region_id,
    //     nu: v.zukan_id,
    //   }
    // })
    return a
  }
}
