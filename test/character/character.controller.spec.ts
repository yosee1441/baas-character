import { Test, TestingModule } from '@nestjs/testing';

import { CharacterController } from 'src/character/character.controller';
import { CharacterService } from 'src/character/character.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  mockfindAllCharacters,
  mockFeaturedCharacters,
} from '../mocks/character';
import { plainToInstance } from 'class-transformer';

describe('CharacterController', () => {
  let controller: CharacterController;
  let characterService: CharacterService;

  const mockCharacterService = {
    findAll: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockfindAllCharacters)),
    findAllFeatured: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockFeaturedCharacters)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        CharacterService,
        {
          provide: CharacterService,
          useValue: mockCharacterService,
        },
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
    characterService = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(characterService).toBeDefined();
  });

  describe('findAllCharacters', () => {
    it('should all characters', async () => {
      const dto = plainToInstance(PaginationDto, { page: 1 });

      expect(await controller.findAllCharacters(dto)).toBe(
        mockfindAllCharacters,
      );
    });

    it('should be equal total characters', async () => {
      const dto = plainToInstance(PaginationDto, { page: 1 });

      const response = await controller.findAllCharacters(dto);
      expect(response.total).toEqual(mockfindAllCharacters.total);
    });

    it('should disable prev', async () => {
      const dto = plainToInstance(PaginationDto, { page: 1 });

      const response = await controller.findAllCharacters(dto);
      expect(response.prev).toEqual(mockfindAllCharacters.prev);
    });

    it('should be equal total results', async () => {
      const dto = plainToInstance(PaginationDto, { page: 1 });

      const response = await controller.findAllCharacters(dto);
      expect(response.results.length).toEqual(20);
    });

    it('should have favorites', async () => {
      const dto = plainToInstance(PaginationDto, { page: 1 });

      const response = await controller.findAllCharacters(dto);
      expect(response.results[0].favoriteCharacters.length).toBeGreaterThan(0);
    });

    it("shouldn't have favorites", async () => {
      const dto = plainToInstance(PaginationDto, { page: 1 });

      const response = await controller.findAllCharacters(dto);
      expect(response.results[2].favoriteCharacters.length).toEqual(0);
    });
  });

  describe('findAllFeatured', () => {
    it('should all featured characters', async () => {
      expect(await controller.findAllFeatured()).toBe(mockFeaturedCharacters);
    });

    it('should be equal total characters', async () => {
      const response = await controller.findAllFeatured();
      expect(response.length).toEqual(20);
    });

    it("shouldn't have favorites", async () => {
      const response = await controller.findAllFeatured();
      expect(response[2].favoriteCharacters.length).toEqual(0);
    });
  });
});
