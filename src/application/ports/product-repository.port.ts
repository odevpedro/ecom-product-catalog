import { Product } from '../../core/entities/product.entity';

export interface ListProductsFilters {
  category?: string;
  q?: string;
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(filters?: ListProductsFilters): Promise<PaginatedResult<Product>>;
  delete(id: string): Promise<void>;
}
