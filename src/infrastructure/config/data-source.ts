import { DataSource, DataSourceOptions } from 'typeorm';
import { ProductModel } from '../persistence/models/product.model';

const options: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://ecom:ecom@localhost:5431/ecom_catalog',
  entities: [ProductModel],
  migrations: ['src/infrastructure/persistence/migrations/*.ts'],
  synchronize: false,
};

export const AppDataSource = new DataSource(options);
