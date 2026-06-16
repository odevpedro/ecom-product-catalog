import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../core/entities/product.entity';
import { Money } from '../../../core/value-objects/money.vo';
import { ProductRepository } from '../../../application/ports/product-repository.port';
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

  async findAll(filters?: { category?: string }): Promise<Product[]> {
    const where = filters?.category ? { category: filters.category } : {};
    const models = await this.repo.find({ where });
    return models.map((m) => this.toDomain(m));
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
