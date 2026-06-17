import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './interfaces/controllers/product.controller';
import { HealthController } from './interfaces/controllers/health.controller';
import { ProductModel } from './infrastructure/persistence/models/product.model';
import { ProductRepositoryImpl } from './infrastructure/persistence/repositories/product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { ListProductsUseCase } from './application/use-cases/list-products.usecase';
import { UpdateProductUseCase } from './application/use-cases/update-product.usecase';
import { DeleteProductUseCase } from './application/use-cases/delete-product.usecase';
import { RequestIdInterceptor } from './interceptors/request-id.interceptor';
import { AllExceptionsFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [ProductModel],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([ProductModel]),
  ],
  controllers: [ProductController, HealthController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestIdInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    ProductRepositoryImpl,
    {
      provide: CreateProductUseCase,
      useFactory: (repo: ProductRepositoryImpl) => new CreateProductUseCase(repo),
      inject: [ProductRepositoryImpl],
    },
    {
      provide: ListProductsUseCase,
      useFactory: (repo: ProductRepositoryImpl) => new ListProductsUseCase(repo),
      inject: [ProductRepositoryImpl],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (repo: ProductRepositoryImpl) => new UpdateProductUseCase(repo),
      inject: [ProductRepositoryImpl],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (repo: ProductRepositoryImpl) => new DeleteProductUseCase(repo),
      inject: [ProductRepositoryImpl],
    },
  ],
})
export class AppModule {}
