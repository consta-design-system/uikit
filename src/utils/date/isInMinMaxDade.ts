import { isWithinInterval } from 'date-fns';

const isMinMax = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  const minDateTime = minDate?.getTime();
  const maxDateTime = maxDate?.getTime();

  if (minDate && maxDate && minDateTime && maxDateTime) {
    return minDateTime < maxDateTime
      ? isWithinInterval(date, { start: minDate, end: maxDate })
      : false;
  }

  const dateTime = date.getTime();

  if (minDateTime && !maxDateTime) {
    return minDateTime <= dateTime;
  }

  if (!minDateTime && maxDateTime) {
    return maxDateTime >= dateTime;
  }

  return true;
};

export const isInMinMaxDate = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  startOf?: (date: Date) => Date,
  endOf?: (date: Date) => Date,
): boolean => {
  if (!minDate && !maxDate) {
    return true;
  }
  return isMinMax(
    date,
    (startOf && minDate && startOf(minDate)) || minDate,
    (endOf && maxDate && endOf(maxDate)) || maxDate,
  );
};
