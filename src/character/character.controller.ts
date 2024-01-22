import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CharacterService } from './character.service';
import { characterSchema, characterPaginationSchema } from './schemas';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Character')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all characters with pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
    schema: {
      example: characterPaginationSchema,
    },
  })
  findAllCharacters(@Query() dto: PaginationDto) {
    return this.characterService.findAll(dto);
  }

  @Get('/featured')
  @ApiOperation({
    summary: 'Get all featured characters',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful Response',
    schema: {
      example: [characterSchema],
    },
  })
  findAllFeatured() {
    return this.characterService.findAllFeatured();
  }
}
