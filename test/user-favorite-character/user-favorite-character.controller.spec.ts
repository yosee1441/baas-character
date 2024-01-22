import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';

import { UserFavoriteCharacterController } from 'src/user-favorite-character/user-favorite-character.controller';
import { UserFavoriteCharacterService } from 'src/user-favorite-character/user-favorite-character.service';
import { CreateUserFavoriteCharacterDto } from 'src/user-favorite-character/dto/create-user-favorite-character.dto';
import { mockCreateFavoriteSchema } from '../mocks/user-favorite-character';

describe('UserFavoriteCharacterController', () => {
  let controller: UserFavoriteCharacterController;
  let userFavoriteCharacterService: UserFavoriteCharacterService;

  const mockUserFavoriteCharacterService = {
    create: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockCreateFavoriteSchema)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFavoriteCharacterController],
      providers: [
        UserFavoriteCharacterService,
        {
          provide: UserFavoriteCharacterService,
          useValue: mockUserFavoriteCharacterService,
        },
      ],
    }).compile();

    controller = module.get<UserFavoriteCharacterController>(
      UserFavoriteCharacterController,
    );
    userFavoriteCharacterService = module.get<UserFavoriteCharacterService>(
      UserFavoriteCharacterService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userFavoriteCharacterService).toBeDefined();
  });

  describe('findAllCharacters', () => {
    it('should create a favorite', async () => {
      const dto = plainToInstance(CreateUserFavoriteCharacterDto, {
        userId: 1,
        characterId: 1,
      });

      expect(await controller.create(dto)).toBe(mockCreateFavoriteSchema);
    });
  });
});
