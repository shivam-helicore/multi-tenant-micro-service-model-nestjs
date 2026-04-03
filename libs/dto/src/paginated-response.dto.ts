export class PaginatedResponseDto<T> {
  items: T[] = [];
  total = 0;
  page?: number;
  limit?: number;
}

