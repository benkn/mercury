import { Transaction } from 'plaid';
import { toColumnFormat } from '../toColumnFormat';

const t1: Partial<Transaction> = {
  date: '2023-11-12',
  amount: 100,
  name: 'Storemart'
};

const t2: Partial<Transaction> = {
  date: '2023-11-13',
  amount: 200,
  name: 'Buymart'
};

describe('toColumnFormat', () => {
  it('empty', () => {
    expect(toColumnFormat([])).toEqual([]);
  });

  test('single entry', () => {
    // expect(toColumnFormat([t1])).toEqual([['2023-11-12', t1.description, '100']]);
  });
  test('double entry', () => {
    // expect(toColumnFormat([t1, t2])).toEqual([
    //   ['2023-11-12', t1.name, '100'],
    //   ['2023-11-13', t2.name, '200']
    // ]);
  });
});
