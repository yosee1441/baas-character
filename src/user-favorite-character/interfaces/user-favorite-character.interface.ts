export interface UserFavoriteCharacter {
  id: number;
  userId: number;
  characterId: number;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
