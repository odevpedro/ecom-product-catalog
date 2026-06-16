import { Product } from './product.entity';
import { Money } from '../value-objects/money.vo';

describe('Product', () => {
  const validProps = {
    name: 'Notebook',
    description: 'Dell Inspiron',
    price: Money.create(450000),
    sku: 'NOTE-001',
    category: 'Eletronicos',
    stockQuantity: 10,
  };

  it('creates with valid props', () => {
    const product = Product.create(validProps);
    expect(product.name).toBe('Notebook');
    expect(product.sku).toBe('NOTE-001');
    expect(product.stockQuantity).toBe(10);
  });

  it('generates an id', () => {
    const product = Product.create(validProps);
    expect(product.id).toBeDefined();
  });

  it('updates fields', () => {
    const product = Product.create(validProps);
    product.update({ name: 'Notebook Updated', stockQuantity: 5 });
    expect(product.name).toBe('Notebook Updated');
    expect(product.stockQuantity).toBe(5);
  });

  it('updates price', () => {
    const product = Product.create(validProps);
    const newPrice = Money.create(500000);
    product.update({ price: newPrice });
    expect(product.price.amount).toBe(500000);
  });

  it('only updates provided fields', () => {
    const product = Product.create(validProps);
    product.update({ name: 'Only Name' });
    expect(product.name).toBe('Only Name');
    expect(product.category).toBe('Eletronicos');
  });
});
