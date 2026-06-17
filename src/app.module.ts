import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './interfaces/controllers/product.controller';
import { HealthController } from './interfaces/controllers/health.controller';
import { ProductModel } from './infrastructure/persistence/models/product.model';
import { ProductRepositoryImpl } from './infrastructure/persistence/repositories/product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { ListProductsUseCase } from './application/use-cases/list-products.usecase';
import { GetProductUseCase } from './application/use-cases/get-product.usecase';
import { UpdateProductUseCase } from './application/use-cases/update-product.usecase';
import { DeleteProductUseCase } from './application/use-cases/delete-product.usecase';
import { InMemoryCache } from './infrastructure/cache/in-memory-cache';
import { RequestIdInterceptor } from './interceptors/request-id.interceptor';
import { AllExceptionsFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [ProductModel],
      migrations: ['dist/infrastructure/persistence/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([ProductModel]),
  ],
  controllers: [ProductController, HealthController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestIdInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    ProductRepositoryImpl,
    InMemoryCache,
    {
      provide: CreateProductUseCase,
      useFactory: (repo: ProductRepositoryImpl, cache: InMemoryCache) => new CreateProductUseCase(repo, cache),
      inject: [ProductRepositoryImpl, InMemoryCache],
    },
    {
      provide: ListProductsUseCase,
      useFactory: (repo: ProductRepositoryImpl, cache: InMemoryCache) => new ListProductsUseCase(repo, cache),
      inject: [ProductRepositoryImpl, InMemoryCache],
    },
    {
      provide: GetProductUseCase,
      useFactory: (repo: ProductRepositoryImpl) => new GetProductUseCase(repo),
      inject: [ProductRepositoryImpl],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (repo: ProductRepositoryImpl, cache: InMemoryCache) => new UpdateProductUseCase(repo, cache),
      inject: [ProductRepositoryImpl, InMemoryCache],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (repo: ProductRepositoryImpl, cache: InMemoryCache) => new DeleteProductUseCase(repo, cache),
      inject: [ProductRepositoryImpl, InMemoryCache],
    },
  ],
})
export class AppModule {}
