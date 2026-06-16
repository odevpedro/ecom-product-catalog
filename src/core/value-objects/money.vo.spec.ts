import { Money } from './money.vo';

describe('Money', () => {
  it('creates with valid amount and currency', () => {
    const money = Money.create(1000, 'BRL');
    expect(money.amount).toBe(1000);
    expect(money.currency).toBe('BRL');
  });

  it('defaults currency to BRL', () => {
    const money = Money.create(500);
    expect(money.currency).toBe('BRL');
  });

  it('converts cents to real', () => {
    const money = Money.create(15050);
    expect(money.toReal()).toBe(150.5);
  });

  it('throws for non-integer amount', () => {
    expect(() => Money.create(10.5)).toThrow('cents');
  });

  it('throws for negative amount', () => {
    expect(() => Money.create(-100)).toThrow('non-negative');
  });

  it('throws for invalid currency', () => {
    expect(() => Money.create(100, 'BRLR')).toThrow('ISO');
  });

  it('equals same amount and currency', () => {
    const a = Money.create(1000, 'BRL');
    const b = Money.create(1000, 'BRL');
    expect(a.equals(b)).toBe(true);
  });

  it('not equals different amount', () => {
    const a = Money.create(1000, 'BRL');
    const b = Money.create(2000, 'BRL');
    expect(a.equals(b)).toBe(false);
  });
});
