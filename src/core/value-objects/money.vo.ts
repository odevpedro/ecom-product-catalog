import { InvalidMoneyException } from '../exceptions/domain.exception';

export class Money {
  private constructor(
    private readonly _amount: number,
    private readonly _currency: string,
  ) {
    if (!Number.isInteger(_amount)) {
      throw new InvalidMoneyException('Amount must be in cents (integer)');
    }
    if (_amount < 0) {
      throw new InvalidMoneyException('Amount must be non-negative');
    }
    if (!_currency || _currency.length !== 3) {
      throw new InvalidMoneyException('Currency must be a 3-letter ISO code');
    }
  }

  static create(amountCents: number, currency: string = 'BRL'): Money {
    return new Money(amountCents, currency.toUpperCase());
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  toReal(): number {
    return this._amount / 100;
  }

  equals(other: Money): boolean {
    return this._amount === other._amount && this._currency === other._currency;
  }
}
