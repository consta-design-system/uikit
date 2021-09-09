import { DateRange } from '../../../utils/types/Date';

type IsDateInRangeResult = 'first' | 'last' | boolean;

export const isDateInRange = (date: Date, range: DateRange): IsDateInRangeResult => {
  if (!range[0] || !range[1]) {
    return false;
  }

  const dateTime = date.getTime();
  const rangeTime = [range[0].getTime(), range[1].getTime()];

  if (dateTime === rangeTime[0]) {
    return 'first';
  }

  if (dateTime === rangeTime[1]) {
    return 'last';
  }

  if (dateTime > rangeTime[0] && dateTime < rangeTime[1]) {
    return true;
  }

  return false;
};
