import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductModel } from '../persistence/models/product.model';

export function databaseConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [ProductModel],
    synchronize: false,
  };
}
