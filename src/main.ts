import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const dataSource = app.get(DataSource);
  await dataSource.runMigrations();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`Product Catalog running on port ${port}`);
}
bootstrap();
