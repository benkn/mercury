/**
 * The function "toShortISO" takes a Date object and returns a string representing the date in the
 * format "YYYY-MM-DD".
 * @param {Date} date - The `date` parameter is of type `Date` and represents the date for which we
 * want to get the short ISO format.
 * @returns a string that represents the short ISO format of the given date. If the date is undefined,
 * the function returns undefined.
 */
export function toShortISO(date: Date): string | undefined {
  return date ? date.toISOString().substring(0, 10) : undefined;
}
