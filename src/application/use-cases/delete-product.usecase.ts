import { ProductNotFoundException } from '../../core/exceptions/domain.exception';
import { ProductRepository } from '../ports/product-repository.port';

export class DeleteProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }

    await this.repository.delete(id);
  }
}
