import { SelectQueryBuilder } from 'typeorm';

export class Paginator<T> {
  async paginate(
    query: SelectQueryBuilder<T>,
    limit: number | undefined,
    offset: number | undefined,
  ): Promise<{ items: T[]; paginationMetadata: any }> {
    const totalItems = await query.getCount();

    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.offset(offset);
    }

    const items = await query.getMany();

    const totalPages = Math.ceil(totalItems / (limit || totalItems)); // Avoid division by zero

    const paginationMetadata = {
      totalItems,
      itemsPerPage: items.length,
      totalPages,
      currentPage: offset ? Math.floor(offset / (limit || totalItems)) + 1 : 1,
    };

    return { items, paginationMetadata };
  }
}
