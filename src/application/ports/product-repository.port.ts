import { Product } from '../../core/entities/product.entity';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(filters?: { category?: string }): Promise<Product[]>;
  delete(id: string): Promise<void>;
}
