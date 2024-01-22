import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

describe('UserService', () => {
  let service: UserService;

  const repositoryMockFactory: () => MockType<Repository<User>> = jest.fn(
    () => ({
      create: jest.fn(() => {}),
      findOneBy: jest.fn(() => {}),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
