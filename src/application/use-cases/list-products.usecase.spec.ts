import { ListProductsUseCase } from './list-products.usecase';
import { ProductRepository, PaginatedResult } from '../ports/product-repository.port';
import { Product } from '../../core/entities/product.entity';
import { InMemoryCache } from '../../infrastructure/cache/in-memory-cache';

describe('ListProductsUseCase', () => {
  let repo: jest.Mocked<ProductRepository>;
  let cache: InMemoryCache;
  let useCase: ListProductsUseCase;

  beforeEach(() => {
    repo = {
      save: jest.fn(),
      findById: jest.fn(),
      findBySku: jest.fn(),
      findAll: jest.fn().mockResolvedValue({ items: [], total: 0 }),
      delete: jest.fn(),
    };
    cache = new InMemoryCache();
    useCase = new ListProductsUseCase(repo, cache);
  });

  it('returns paginated empty result', async () => {
    const result = await useCase.execute();
    expect(result).toEqual({
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });
    expect(repo.findAll).toHaveBeenCalledWith({ category: undefined, q: undefined, page: 1, limit: 10 });
  });

  it('filters by category', async () => {
    repo.findAll.mockResolvedValue({ items: [], total: 0 });
    await useCase.execute({ category: 'Eletronicos' });
    expect(repo.findAll).toHaveBeenCalledWith({ category: 'Eletronicos', q: undefined, page: 1, limit: 10 });
  });

  it('searches by text query', async () => {
    repo.findAll.mockResolvedValue({ items: [], total: 0 });
    await useCase.execute({ q: 'shirt' });
    expect(repo.findAll).toHaveBeenCalledWith({ category: undefined, q: 'shirt', page: 1, limit: 10 });
  });

  it('computes totalPages correctly', async () => {
    repo.findAll.mockResolvedValue({ items: [], total: 25 });
    const result = await useCase.execute({ page: 1, limit: 10 });
    expect(result.meta.totalPages).toBe(3);
  });

  it('caches results', async () => {
    repo.findAll.mockResolvedValue({ items: [], total: 5 });
    await useCase.execute({ page: 1, limit: 10 });
    await useCase.execute({ page: 1, limit: 10 });
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it('bypasses cache on different params', async () => {
    repo.findAll.mockResolvedValue({ items: [], total: 5 });
    await useCase.execute({ page: 1, limit: 10 });
    await useCase.execute({ page: 2, limit: 10 });
    expect(repo.findAll).toHaveBeenCalledTimes(2);
  });
});
