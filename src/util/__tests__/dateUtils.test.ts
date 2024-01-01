import { toShortISO } from '../dateUtils';

describe('date utils', () => {
  it('toShortISO', () => {
    let date = new Date('2023-12-15');
    expect(toShortISO(date)).toBe('2023-12-15');
  });
});
