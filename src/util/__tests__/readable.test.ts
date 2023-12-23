import { readable } from '../readable';

describe('readable', () => {
  test('transforms category', () => {
    expect(readable('FOOD_AND_DRINK_COFFEE')).toBe('Food and Drink Coffee');
    expect(readable('TRAVEL_FLIGHTS')).toBe('Travel Flights');
  });
});
