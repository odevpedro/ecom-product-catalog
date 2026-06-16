import { ListProductsUseCase } from './list-products.usecase';
import { ProductRepository } from '../ports/product-repository.port';

describe('ListProductsUseCase', () => {
  it('returns all products', async () => {
    const repo: jest.Mocked<ProductRepository> = {
      save: jest.fn(),
      findById: jest.fn(),
      findBySku: jest.fn(),
      findAll: jest.fn().mockResolvedValue([]),
      delete: jest.fn(),
    };
    const useCase = new ListProductsUseCase(repo);
    const result = await useCase.execute();
    expect(result).toEqual([]);
    expect(repo.findAll).toHaveBeenCalledWith(undefined);
  });

  it('filters by category', async () => {
    const repo: jest.Mocked<ProductRepository> = {
      save: jest.fn(),
      findById: jest.fn(),
      findBySku: jest.fn(),
      findAll: jest.fn().mockResolvedValue([]),
      delete: jest.fn(),
    };
    const useCase = new ListProductsUseCase(repo);
    await useCase.execute({ category: 'Eletronicos' });
    expect(repo.findAll).toHaveBeenCalledWith({ category: 'Eletronicos' });
  });
});
