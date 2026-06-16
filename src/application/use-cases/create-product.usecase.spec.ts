import { CreateProductUseCase } from './create-product.usecase';
import { ProductRepository } from '../ports/product-repository.port';
import { Product } from '../../core/entities/product.entity';
import { ProductAlreadyExistsException } from '../../core/exceptions/domain.exception';

describe('CreateProductUseCase', () => {
  let repo: jest.Mocked<ProductRepository>;
  let useCase: CreateProductUseCase;

  beforeEach(() => {
    repo = {
      save: jest.fn(),
      findById: jest.fn(),
      findBySku: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new CreateProductUseCase(repo);
  });

  it('creates a product when sku is unique', async () => {
    repo.findBySku.mockResolvedValue(null);
    repo.save.mockImplementation(async (p) => p);

    const result = await useCase.execute({
      name: 'Test', description: 'Desc', priceCents: 1000,
      sku: 'TEST-001', category: 'Cat', stockQuantity: 5,
    });

    expect(result.name).toBe('Test');
    expect(repo.save).toHaveBeenCalled();
  });

  it('throws when sku already exists', async () => {
    repo.findBySku.mockResolvedValue(Product.create({
      name: 'Existing', description: '', price: { amount: 100, currency: 'BRL' } as any,
      sku: 'TEST-001', category: '', stockQuantity: 0,
    }));

    await expect(useCase.execute({
      name: 'Test', description: 'Desc', priceCents: 1000,
      sku: 'TEST-001', category: 'Cat', stockQuantity: 5,
    })).rejects.toThrow(ProductAlreadyExistsException);
  });
});
