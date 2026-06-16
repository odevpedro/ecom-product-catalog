import { Product } from '../../core/entities/product.entity';
import { Money } from '../../core/value-objects/money.vo';
import { ProductAlreadyExistsException } from '../../core/exceptions/domain.exception';
import { ProductRepository } from '../ports/product-repository.port';

export interface CreateProductInput {
  name: string;
  description: string;
  priceCents: number;
  currency?: string;
  sku: string;
  category: string;
  stockQuantity: number;
}

export class CreateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const existing = await this.repository.findBySku(input.sku);
    if (existing) {
      throw new ProductAlreadyExistsException(input.sku);
    }

    const product = Product.create({
      name: input.name,
      description: input.description,
      price: Money.create(input.priceCents, input.currency),
      sku: input.sku,
      category: input.category,
      stockQuantity: input.stockQuantity,
    });

    return this.repository.save(product);
  }
}
