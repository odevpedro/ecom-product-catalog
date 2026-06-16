import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1781640561061 implements MigrationInterface {
  name = 'CreateProductsTable1781640561061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(255) NOT NULL,
        "description" text NOT NULL,
        "priceCents" integer NOT NULL,
        "currency" character varying(3) NOT NULL DEFAULT 'BRL',
        "sku" character varying(100) NOT NULL,
        "category" character varying(100) NOT NULL,
        "stockQuantity" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_products" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_products_sku" UNIQUE ("sku")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
