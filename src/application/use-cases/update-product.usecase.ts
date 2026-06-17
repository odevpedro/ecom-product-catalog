import { Product } from '../../core/entities/product.entity';
import { Money } from '../../core/value-objects/money.vo';
import { ProductNotFoundException } from '../../core/exceptions/domain.exception';
import { ProductRepository } from '../ports/product-repository.port';
import { InMemoryCache } from '../../infrastructure/cache/in-memory-cache';

export interface UpdateProductInput {
  name?: string;
  description?: string;
  priceCents?: number;
  currency?: string;
  category?: string;
  stockQuantity?: number;
}

export class UpdateProductUseCase {
  constructor(
    private readonly repository: ProductRepository,
    private readonly cache: InMemoryCache,
  ) {}

  async execute(id: string, input: UpdateProductInput): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }

    product.update({
      name: input.name,
      description: input.description,
      price: input.priceCents !== undefined
        ? Money.create(input.priceCents, input.currency)
        : undefined,
      category: input.category,
      stockQuantity: input.stockQuantity,
    });

    const saved = await this.repository.save(product);
    this.cache.invalidateAll();
    return saved;
  }
}
