import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from './models';
import { UpdateCharacterDto } from './dtos';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  findAllCharacters() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findCharacterById(@Param('id', ParseIntPipe) id: Character['id']) {
    return this.characterService.findOneById(id);
  }

  @Put(':id')
  updateCharacter(
    @Param('id', ParseIntPipe) id: Character['id'],
    @Body() dto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, dto);
  }

  @Get('/favorite/:id')
  addFavorite(@Param('id', ParseIntPipe) id: Character['id']) {
    return { id };
  }

  @Delete(':id')
  deleteCharacter(@Param('id', ParseIntPipe) id: Character['id']) {
    return this.characterService.delete(id);
  }
}
