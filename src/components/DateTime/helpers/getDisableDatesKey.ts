import { DateTimePropDisableDates } from './types';

const serializeDisableDatesItem = (item: Date | [Date, Date]): string => {
  if (item instanceof Date) {
    return `D:${item.getTime()}`;
  }

  const [d1, d2] = item;
  return `R:${d1.getTime()}-${d2.getTime()}`;
};

export const getDisableDatesKey = (
  disableDates?: DateTimePropDisableDates,
  defaultValue: string = 'none',
  separator: string = '|',
): string => {
  if (!disableDates || disableDates.length === 0) {
    return defaultValue;
  }

  const items = disableDates.map(serializeDisableDatesItem);

  const uniqueSorted = Array.from(items).sort();

  return uniqueSorted.join(separator);
};
