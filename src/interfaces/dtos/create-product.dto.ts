import { IsString, IsInt, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsString()
  description!: string;

  @IsInt()
  @Min(0)
  priceCents!: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @MaxLength(100)
  sku!: string;

  @IsString()
  @MaxLength(100)
  category!: string;

  @IsInt()
  @Min(0)
  stockQuantity!: number;
}
