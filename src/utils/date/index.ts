import setYear from 'date-fns/setYear';

export const leapYear = 2020;

export const dateComparer = (a?: Date, b?: Date): number =>
  (a?.getTime() ?? 0) - (b?.getTime() ?? 0);

export const getStartAndEndDate = (date1: Date, date2: Date): Date[] =>
  [date1, date2].sort(dateComparer);

export const minDateDefault = setYear(new Date(1970, 0, 1, 0, 0, 0, 0), 1);
export const maxDateDefault = new Date(9999, 11, 31, 23, 59, 59);

export * from './isInMinMaxDade';
export * from './isDateRange';
export * from './isOnlyOneDateInRange';
export * from './getCentury';
export * from './startOfCentury';
export * from './endOfCentury';
export * from './isEqualDate';
export * from './isDisableDate';
