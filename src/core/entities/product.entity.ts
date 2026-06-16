import { v4 as uuid } from 'uuid';
import { Money } from '../value-objects/money.vo';
import { ProductAlreadyExistsException } from '../exceptions/domain.exception';

export interface ProductProps {
  id?: string;
  name: string;
  description: string;
  price: Money;
  sku: string;
  category: string;
  stockQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  private readonly _id: string;
  private _name: string;
  private _description: string;
  private _price: Money;
  private _sku: string;
  private _category: string;
  private _stockQuantity: number;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: ProductProps) {
    this._id = props.id ?? uuid();
    this._name = props.name;
    this._description = props.description;
    this._price = props.price;
    this._sku = props.sku;
    this._category = props.category;
    this._stockQuantity = props.stockQuantity;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  static create(props: ProductProps): Product {
    return new Product(props);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): Money {
    return this._price;
  }

  get sku(): string {
    return this._sku;
  }

  get category(): string {
    return this._category;
  }

  get stockQuantity(): number {
    return this._stockQuantity;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  update(
    data: Partial<Pick<ProductProps, 'name' | 'description' | 'price' | 'category' | 'stockQuantity'>>,
  ): void {
    if (data.name !== undefined) this._name = data.name;
    if (data.description !== undefined) this._description = data.description;
    if (data.price !== undefined) this._price = data.price;
    if (data.category !== undefined) this._category = data.category;
    if (data.stockQuantity !== undefined) this._stockQuantity = data.stockQuantity;
    this._updatedAt = new Date();
  }
}
