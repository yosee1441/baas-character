import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserFavoriteCharacterService } from './user-favorite-character.service';
import { CreateUserFavoriteCharacterDto } from './dto/create-user-favorite-character.dto';
import { createFavoriteSchema } from './schemas';

@ApiTags('User Favorite Character')
@Controller('favorite')
export class UserFavoriteCharacterController {
  constructor(
    private readonly userFavoriteCharacterService: UserFavoriteCharacterService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create favorite',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: {
      example: createFavoriteSchema,
    },
  })
  create(@Body() dto: CreateUserFavoriteCharacterDto) {
    return this.userFavoriteCharacterService.create(dto);
  }
}
