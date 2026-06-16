import { IsString, IsInt, IsOptional, Min, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  priceCents?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  category?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  stockQuantity?: number;
}
