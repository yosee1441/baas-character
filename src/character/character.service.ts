import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from './entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Pagination } from 'src/common/interfaces';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async findAll(dto: PaginationDto): Promise<Pagination<Character[]>> {
    const [data, total] = await this.characterRepository.findAndCount({
      relations: {
        favoriteCharacters: true,
      },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });

    if (!data || data.length === 0) {
      throw new NotFoundException(
        'No characters found for the specified page.',
      );
    }

    return {
      results: data,
      total,
      pages: Math.ceil(total / dto.limit),
      prev: dto.page > 1,
      next: dto.page < total,
    };
  }

  findAllFeatured(): Promise<Character[]> {
    return this.characterRepository
      .createQueryBuilder('character')
      .leftJoinAndSelect('character.favoriteCharacters', 'favoriteCharacters')
      .where('character.deleted_at IS NULL')
      .orderBy("jsonb_rick_and_morty->'episode'", 'DESC')
      .limit(20)
      .getMany();
  }
}
