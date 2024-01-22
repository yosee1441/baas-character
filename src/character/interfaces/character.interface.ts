import { Origin } from './origin.interface';

export interface CharacterJsonbRickAndMorty {
  id: number;
  url: string;
  name: string;
  type: string;
  image: string;
  gender: string;
  origin: Origin;
  status: string;
  created: string;
  episode: string[];
  species: string;
  location: Origin;
}

export interface Character {
  id: number;
  jsonbRickAndMorty: CharacterJsonbRickAndMorty;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
