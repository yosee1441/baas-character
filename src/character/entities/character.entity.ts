import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Character as CharacterInterface } from '../interfaces';
import { UserFavoriteCharacter } from 'src/user-favorite-character/entities';

@Entity()
export class Character {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', {
    name: 'jsonb_rick_and_morty',
    nullable: false,
    default: {},
  })
  jsonbRickAndMorty: CharacterInterface;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    type: 'timestamp',
  })
  deletedAt?: Date;

  @OneToMany(
    () => UserFavoriteCharacter,
    (userFavoriteCharacter) => userFavoriteCharacter.character,
  )
  favoriteCharacters: UserFavoriteCharacter[];
}
