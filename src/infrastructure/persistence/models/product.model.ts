import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @Column('text')
  description!: string;

  @Column('int')
  priceCents!: number;

  @Column({ length: 3, default: 'BRL' })
  currency!: string;

  @Column({ length: 100, unique: true })
  sku!: string;

  @Column({ length: 100 })
  category!: string;

  @Column('int')
  stockQuantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
