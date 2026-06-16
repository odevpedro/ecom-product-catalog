export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ProductNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Product with id ${id} not found`);
  }
}

export class ProductAlreadyExistsException extends DomainException {
  constructor(sku: string) {
    super(`Product with SKU ${sku} already exists`);
  }
}

export class InvalidMoneyException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
