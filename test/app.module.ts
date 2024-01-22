import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppModule } from 'src/app.module';
// import { CharacterModule } from 'src/character/character.module';
// import { CommonModule } from 'src/common/common.module';
// import { UserModule } from 'src/user/user.module';
// import { UserFavoriteCharacterModule } from 'src/user-favorite-character/user-favorite-character.module';

jest.mock('@nestjs/typeorm', () => ({
  TypeOrmModule: {
    forRoot: jest.fn(),
  },
}));

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(),
        // CharacterModule,
        // CommonModule,
        // UserModule,
        // UserFavoriteCharacterModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  afterAll(async () => {
    await appModule.close();
  });
});
