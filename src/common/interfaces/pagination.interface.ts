export interface Pagination<T> {
  results: T;
  total: number;
  pages: number;
  prev: boolean;
  next: boolean;
}
