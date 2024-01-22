import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { appConfig, databaseConfig } from './configs';
import { CharacterModule } from './character/character.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { UserFavoriteCharacterModule } from './user-favorite-character/user-favorite-character.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, databaseConfig] }),
    TypeOrmModule.forRoot(databaseConfig()),
    CharacterModule,
    CommonModule,
    UserModule,
    UserFavoriteCharacterModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
