import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFavoriteCharacter } from './entities';
import { CreateUserFavoriteCharacterDto } from './dto/create-user-favorite-character.dto';
import { UserFavoriteCharacter as UserFavoriteCharacterInterface } from './interfaces';

@Injectable()
export class UserFavoriteCharacterService {
  constructor(
    @InjectRepository(UserFavoriteCharacter)
    private readonly userFavoriteCharacterRepository: Repository<UserFavoriteCharacter>,
  ) {}

  async create(dto: CreateUserFavoriteCharacterDto) {
    const findedUserFavoriteCharacter =
      await this.findOneByUserIdAndCharacterId(dto.userId, dto.characterId);

    if (findedUserFavoriteCharacter) {
      return this.userFavoriteCharacterRepository.save({
        id: findedUserFavoriteCharacter.id,
        user: { id: dto.userId },
        character: { id: dto.characterId },
        isFavorite: false,
      });
    }

    const userFavoriteCharacter = this.userFavoriteCharacterRepository.create({
      user: { id: dto.userId },
      character: { id: dto.characterId },
      isFavorite: true,
    });

    return this.userFavoriteCharacterRepository.save(userFavoriteCharacter);
  }

  findOneByUserIdAndCharacterId(
    userId: UserFavoriteCharacterInterface['id'],
    characterId?: UserFavoriteCharacterInterface['characterId'],
  ) {
    return this.userFavoriteCharacterRepository.findOneBy({
      user: { id: userId },
      character: { id: characterId },
    });
  }
}
