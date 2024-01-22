export const mockCreateFavoriteSchema = {
  id: 1,
  userId: 1,
  characterId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const mockFavorite = {
  id: 1,
  character: {
    id: 1,
  },
  user: {
    id: 1,
  },
  isFavorite: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
