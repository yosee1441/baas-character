export interface User {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
