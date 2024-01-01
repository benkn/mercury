import { DateRange, decideDateRange } from '../decideDateRange';

describe('decideDateRange', () => {
  const novemberRange: DateRange = {
    startDate: '2023-11-01',
    endDate: '2023-11-30',
  };

  const decemberRange: DateRange = {
    startDate: '2023-12-01',
    endDate: '2023-12-31',
  };

  it('returns the month for the date', () => {
    expect(decideDateRange(new Date('2023-12-06'))).toEqual(decemberRange);
    expect(decideDateRange(new Date('2023-12-15'))).toEqual(decemberRange);
    expect(decideDateRange(new Date('2023-12-31'))).toEqual(decemberRange);
  });

  it('returns last month for the date', () => {
      expect(decideDateRange(new Date('2023-12-01'))).toEqual(novemberRange);
      expect(decideDateRange(new Date('2023-12-04'))).toEqual(novemberRange);
      expect(decideDateRange(new Date('2023-12-05'))).toEqual(novemberRange);
      expect(decideDateRange(new Date('2023-11-15'))).toEqual(novemberRange);
  });

  it('returns last year new years', () => {
    expect(decideDateRange(new Date('2024-01-02'))).toEqual(decemberRange);
    expect(decideDateRange(new Date('2024-01-04'))).toEqual(decemberRange);
  });
});
