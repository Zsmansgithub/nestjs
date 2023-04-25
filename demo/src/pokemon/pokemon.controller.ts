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
  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }
}
