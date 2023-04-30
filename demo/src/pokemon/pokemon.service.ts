import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { eq } from 'cheerio/lib/api/traversing';

@Injectable()
export class PokemonService {
  async findAll(id: string) {
    const pok = fs.readFileSync(path.join(__dirname, './pokemons.json'), { encoding: 'utf-8' });
    let po = JSON.parse(pok)
    // po.forEach((v) => {
    //   delete v.pokemon_ability_name
    //   delete v.pokemon_ability_id
    // })
    const arr = fs.readFileSync(path.join(__dirname, './pokemonAbility.json'), { encoding: 'utf-8' });
    const a = JSON.parse(arr);
    const ar = JSON.parse(arr).slice((Number(id) - 2) * 10, (Number(id) - 1) * 10);
    let index = 0
    const getCosplay = async () => {
      // const url = `https://www.pokemon.cn/play/pokedex`
      const u = `https://www.pokemon.cn/play/pokedex/api/v1?pokemon_ability_id=${ar[index].pokemon_ability_id}&zukan_id_from=1&zukan_id_to=898`
      const res = await axios.get(u).then(async res => res.data)
      const pokemons = res.pokemons
      pokemons.forEach((v) => {
        const k = Object.keys(v)
        const item = po.find(i =>
          i.file_name === v.file_name
          && i.height === v.height
          && i.pokemon_name === v.pokemon_name
          && i.pokemon_sub_name === v.pokemon_sub_name
          && i.pokemon_type_id === v.pokemon_type_id
          && i.pokemon_type_name === v.pokemon_type_name
          && i.weight === v.weight
          && i.zukan_id === v.zukan_id
          && i.zukan_sub_id === v.zukan_sub_id
        )
        if (Array.isArray(item.pokemon_ability_id)) {
          item.pokemon_ability_name.push(ar[index].pokemon_ability_name)
          item.pokemon_ability_id.push(ar[index].pokemon_ability_id)
        } else {
          item.pokemon_ability_name = [ar[index].pokemon_ability_name]
          item.pokemon_ability_id = [ar[index].pokemon_ability_id]
        }
      })
      index++
      if (index < ar.length) {
        await getCosplay()
      }
    };
    await getCosplay()
    po = po.map(v => {
      v.pokemon_ability_name = [...new Set(v.pokemon_ability_name)].join(',')
      v.pokemon_ability_id = [...new Set(v.pokemon_ability_id)].join(',')
      return v
    })
    fs.writeFile(path.join(__dirname, './pokemons.json'), JSON.stringify(po, null, 2), (error) => {
      if (error) {
        console.log('An error has occurred ', error);
        return;
      }
      console.log('Data written successfully to disk');
    });
    return `pokemon`;
  }

  async findAllDetail(id: string) {
    const pok = fs.readFileSync(path.join(__dirname, './pokemons.json'), { encoding: 'utf-8' });
    let po = JSON.parse(pok);
    let index = 1080;
    const getCosplay = async () => {
      const u = `https://www.pokemon.cn/play/pokedex/${po[index].zukan_id}${po[index].zukan_sub_id > 0 ? ('_' + po[index].zukan_sub_id) : ''}`
      // const u = `https://www.pokemon.cn/play/pokedex/0737`
      const body = await axios.get(u).then(async res => res.data)
      const $ = cheerio.load(body)
      const page = $('.pokemon-weakness__btn')
      const pokemonWeakness = page.map(function () {
        return $(this).find('a').find('span').text();
      })
      const page1 = $('.pokemon-info__category').eq(0).find('.pokemon-info__value').find('span');
      // 性别
      const m = $('img[src="/play/resources/pokedex/img/icon_male.png"]')
      const fm = $('img[src="/play/resources/pokedex/img/icon_female.png"]')
      // 描述
      const story = $('.pokemon-story__body').eq(0).find('span').text();
      // 能力
      const cla = [
        '.d1',
        '.d2',
        '.d3',
        '.d4',
        '.d5',
        '.d6',
        '.d7',
        '.d8',
        '.d9',
        '.d10',
        '.d11',
        '.d12',
        '.d13',
        '.d14',
        '.d15',
      ]
      const hp = $('.pokemon-status__scale-box').eq(0);
      const hpl = cla.reduce((len, i) => {
        len += hp.find(i).length
        return len
      }, 0)
      const gj = $('.pokemon-status__scale-box').eq(1);
      const gjl = cla.reduce((len, i) => {
        len += gj.find(i).length
        return len
      }, 0)
      const fy = $('.pokemon-status__scale-box').eq(2);
      const fyl = cla.reduce((len, i) => {
        len += fy.find(i).length
        return len
      }, 0)
      const tg = $('.pokemon-status__scale-box').eq(3);
      const tgl = cla.reduce((len, i) => {
        len += tg.find(i).length
        return len
      }, 0)
      const tf = $('.pokemon-status__scale-box').eq(4);
      const tfl = cla.reduce((len, i) => {
        len += tf.find(i).length
        return len
      }, 0)
      const sd = $('.pokemon-status__scale-box').eq(5);
      const sdl = cla.reduce((len, i) => {
        len += sd.find(i).length
        return len
      }, 0)
      // 进化路线
      const xt = $('.pokemon-evolution-item__info')
      const evolutionary_route = Array.from(xt.map(function () {
        return $(this).find('.pokemon-evolution-box__no').text();
      }))
      po[index].male = m.length ? true : false;
      po[index].female = fm.length ? true : false;
      po[index]['pokemon-weakness'] = Array.from(pokemonWeakness)
      po[index]['pokemon_info_category'] = page1.text()
      po[index]['pokemon_story'] = story
      po[index]['hp'] = hpl
      po[index]['attack'] = gjl
      po[index]['defense'] = fyl
      po[index]['special_merit'] = tgl
      po[index]['Special_defense'] = tfl
      po[index]['speed'] = sdl
      po[index]['evolutionary_route'] = evolutionary_route

      index++;
      console.log(index);
      if (index < 1081) {
        await getCosplay()
      }
    };
    await getCosplay()

    fs.writeFile(path.join(__dirname, './pokemons.json'), JSON.stringify(po, null, 2), (error) => {
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

    const pok = fs.readFileSync(path.join(__dirname, './pokemons.json'), { encoding: 'utf-8' });
    const po = JSON.parse(pok)
    // const a = po.map(v => baseUrl + v.file_name)
    // this.whiteFile(a);
    // const a = po.map(v => {
    //   return {
    //     n: v.pokemon_ability_name,
    //     id: v.pokemon_ability_id,
    //     nu: v.zukan_id,
    //   }
    // })
    const a = po.find(v => {
      return !v.pokemon_story || v.pokemon_story === '' || v.pokemon_story.length === 0
    })
    return a
  }
}
