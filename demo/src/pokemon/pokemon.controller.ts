import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('1')
  findAll1() {
    return this.pokemonService.findAll1();
  }
  @Get('detail/:id')
  findAllDetail(@Param('id') id:string,) {
    return this.pokemonService.findAllDetail(id);
  }
  @Get(':id')
  findAll(@Param('id') id:string,) {
    return this.pokemonService.findAll(id);
  }
}
