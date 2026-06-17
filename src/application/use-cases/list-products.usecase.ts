import { Product } from '../../core/entities/product.entity';
import { ProductRepository } from '../ports/product-repository.port';
import { InMemoryCache } from '../../infrastructure/cache/in-memory-cache';

export interface ListProductsInput {
  category?: string;
  q?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class ListProductsUseCase {
  constructor(
    private readonly repository: ProductRepository,
    private readonly cache: InMemoryCache,
  ) {}

  async execute(filters?: ListProductsInput): Promise<PaginatedResponse> {
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 10;
    const params = { category: filters?.category, q: filters?.q, page, limit };

    const cacheKey = JSON.stringify(params);
    const cached = this.cache.get<PaginatedResponse>(cacheKey);
    if (cached) return cached;

    const { items, total } = await this.repository.findAll(params);
    const result: PaginatedResponse = {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    this.cache.set(cacheKey, result);
    return result;
  }
}
