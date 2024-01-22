import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFavoriteCharacter } from 'src/user-favorite-character/entities';
import { UserFavoriteCharacterService } from 'src/user-favorite-character/user-favorite-character.service';
import { mockCreateFavoriteSchema } from '../mocks/user-favorite-character';

type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

describe('UserFavoriteCharacterService', () => {
  let service: UserFavoriteCharacterService;

  const repositoryMockFactory: () => MockType<
    Repository<UserFavoriteCharacter>
  > = jest.fn(() => ({
    save: jest.fn((mockCreateFavoriteSchema) => mockCreateFavoriteSchema),
    findOneBy: jest.fn(() => mockCreateFavoriteSchema),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFavoriteCharacterService,
        {
          provide: getRepositoryToken(UserFavoriteCharacter),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserFavoriteCharacterService>(
      UserFavoriteCharacterService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
