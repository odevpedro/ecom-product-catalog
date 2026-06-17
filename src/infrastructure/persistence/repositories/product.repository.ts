import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from '../../../core/entities/product.entity';
import { Money } from '../../../core/value-objects/money.vo';
import {
  ProductRepository,
  ListProductsFilters,
  PaginatedResult,
} from '../../../application/ports/product-repository.port';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repo: Repository<ProductModel>,
  ) {}

  async save(product: Product): Promise<Product> {
    const model = this.toModel(product);
    const saved = await this.repo.save(model);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Product | null> {
    const model = await this.repo.findOne({ where: { id } });
    return model ? this.toDomain(model) : null;
  }

  async findBySku(sku: string): Promise<Product | null> {
    const model = await this.repo.findOne({ where: { sku } });
    return model ? this.toDomain(model) : null;
  }

  async findAll(filters?: ListProductsFilters): Promise<PaginatedResult<Product>> {
    const { category, q, page, limit } = filters ?? { page: 1, limit: 10 };

    const where: Record<string, any> = {};
    if (category) where.category = category;

    const findOptions: any = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (q) {
      const searchClause = { ...where, name: ILike(`%${q}%`) };
      const searchClause2 = { ...where, description: ILike(`%${q}%`) };
      findOptions.where = [searchClause, searchClause2];
    } else {
      findOptions.where = Object.keys(where).length > 0 ? where : {};
    }

    const [models, total] = await this.repo.findAndCount(findOptions);
    return { items: models.map((m) => this.toDomain(m)), total };
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  private toModel(domain: Product): ProductModel {
    const model = new ProductModel();
    model.id = domain.id;
    model.name = domain.name;
    model.description = domain.description;
    model.priceCents = domain.price.amount;
    model.currency = domain.price.currency;
    model.sku = domain.sku;
    model.category = domain.category;
    model.stockQuantity = domain.stockQuantity;
    model.createdAt = domain.createdAt;
    model.updatedAt = domain.updatedAt;
    return model;
  }

  private toDomain(model: ProductModel): Product {
    return Product.create({
      id: model.id,
      name: model.name,
      description: model.description,
      price: Money.create(model.priceCents, model.currency),
      sku: model.sku,
      category: model.category,
      stockQuantity: model.stockQuantity,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}
