import { Product } from '../../core/entities/product.entity';
import { ProductNotFoundException } from '../../core/exceptions/domain.exception';
import { ProductRepository } from '../ports/product-repository.port';

export class GetProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }
}
