import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { ListProductsUseCase } from '../../application/use-cases/list-products.usecase';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.usecase';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.usecase';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Controller('api/products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    const product = await this.createProductUseCase.execute({
      name: dto.name,
      description: dto.description,
      priceCents: dto.priceCents,
      currency: dto.currency,
      sku: dto.sku,
      category: dto.category,
      stockQuantity: dto.stockQuantity,
    });
    return this.toResponse(product);
  }

  @Get()
  async list(@Query('category') category?: string) {
    const products = await this.listProductsUseCase.execute({ category });
    return products.map((p) => this.toResponse(p));
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const products = await this.listProductsUseCase.execute();
    const product = products.find((p) => p.id === id);
    if (!product) return { message: 'Product not found' };
    return this.toResponse(product);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const product = await this.updateProductUseCase.execute(id, {
      name: dto.name,
      description: dto.description,
      priceCents: dto.priceCents,
      currency: dto.currency,
      category: dto.category,
      stockQuantity: dto.stockQuantity,
    });
    return this.toResponse(product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteProductUseCase.execute(id);
  }

  private toResponse(product: any) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      priceCents: product.price.amount,
      currency: product.price.currency,
      price: product.price.toReal(),
      sku: product.sku,
      category: product.category,
      stockQuantity: product.stockQuantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
