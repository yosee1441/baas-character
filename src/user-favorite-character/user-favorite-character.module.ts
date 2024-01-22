import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserFavoriteCharacterService } from './user-favorite-character.service';
import { UserFavoriteCharacterController } from './user-favorite-character.controller';
import { UserFavoriteCharacter } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavoriteCharacter])],
  controllers: [UserFavoriteCharacterController],
  providers: [UserFavoriteCharacterService],
})
export class UserFavoriteCharacterModule {}
