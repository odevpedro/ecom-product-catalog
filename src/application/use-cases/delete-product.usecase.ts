import { ProductNotFoundException } from '../../core/exceptions/domain.exception';
import { ProductRepository } from '../ports/product-repository.port';
import { InMemoryCache } from '../../infrastructure/cache/in-memory-cache';

export class DeleteProductUseCase {
  constructor(
    private readonly repository: ProductRepository,
    private readonly cache: InMemoryCache,
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }

    await this.repository.delete(id);
    this.cache.invalidateAll();
  }
}
