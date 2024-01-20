import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { appConfig, databaseConfig } from './configs';
import { CharacterController } from './character/character.controller';
import { CharacterModule } from './character/character.module';
import { CharacterService } from './character/character.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, databaseConfig] }),
    TypeOrmModule.forRoot(databaseConfig()),
    CharacterModule,
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [],
})
export class AppModule {}
