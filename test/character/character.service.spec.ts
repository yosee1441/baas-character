import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CharacterService } from 'src/character/character.service';
import { Character } from 'src/character/entities';
import {
  mockfindAllCharacters,
  mockFeaturedCharacters,
} from '../mocks/character';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

describe('CharacterService', () => {
  let service: CharacterService;

  const repositoryMockFactory: () => MockType<Repository<Character>> = jest.fn(
    () => ({
      findAndCount: jest.fn(() => [
        mockfindAllCharacters.results,
        mockfindAllCharacters.total,
      ]),
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn(() => ({
          where: jest.fn(() => ({
            orderBy: jest.fn(() => ({
              limit: jest.fn(() => ({
                getMany: jest.fn(() => mockFeaturedCharacters),
              })),
            })),
          })),
        })),
      })),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getRepositoryToken(Character),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should paginate', async () => {
      const dto = plainToInstance(PaginationDto, { page: 1 });

      await service.findAll(dto);

      expect(service['characterRepository'].findAndCount).toHaveBeenCalledWith({
        relations: {
          favoriteCharacters: true,
        },
        skip: dto.skip,
        take: dto.limit,
      });
    });

    it('should be equal data and total', async () => {
      const dto = plainToInstance(PaginationDto, { page: 1 });

      await service.findAll(dto);
      const [data, total] = await service['characterRepository'].findAndCount({
        relations: {
          favoriteCharacters: true,
        },
        skip: dto.skip,
        take: dto.limit,
      });

      expect(data.length).toEqual(20);
      expect(total).toEqual(mockfindAllCharacters.total);
    });

    it('should not found characters', async () => {
      jest
        .spyOn(service['characterRepository'], 'findAndCount')
        .mockResolvedValueOnce([[], 0]);

      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10,
        skip: 0,
      };

      await expect(service.findAll(paginationDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findAllFeatured', () => {
    it('should all featured characters', async () => {
      await service.findAllFeatured();

      await expect(
        service['characterRepository']
          .createQueryBuilder('character')
          .leftJoinAndSelect(
            'character.favoriteCharacters',
            'favoriteCharacters',
          )
          .where('character.deleted_at IS NULL')
          .orderBy("jsonb_rick_and_morty->'episode'", 'DESC')
          .limit(20)
          .getMany(),
      ).toBe(mockFeaturedCharacters);
    });
  });
});
