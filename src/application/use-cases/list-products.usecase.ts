import { Product } from '../../core/entities/product.entity';
import { ProductRepository } from '../ports/product-repository.port';

export interface ListProductsInput {
  category?: string;
}

export class ListProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(filters?: ListProductsInput): Promise<Product[]> {
    return this.repository.findAll(filters);
  }
}
