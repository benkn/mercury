import { toShortISO } from './dateUtils';

export interface DateRange {
  startDate: string;
  endDate: string;
}

/** Creates a date range based on the current date to refer to either this month or last month. */
export function decideDateRange(today: Date): DateRange {
  let monthStart, monthEnd;

  // if today is within 5 days of last month, keep last month in the range
  if (today.getDate() <= 4) {
    monthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
  }

  // if not, only do this whole month
  else {
    monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  }

  const range: DateRange = {
    startDate: toShortISO(monthStart) as string,
    endDate: toShortISO(monthEnd) as string,
  };
  return range;
}
