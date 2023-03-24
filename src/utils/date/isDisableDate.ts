import {
  DateTimePropDisableDates,
  DateTimePropType,
} from '##/components/DateTime';

const clearTime = (
  date: Date,
  type: 'start' | 'end',
  params?: {
    hours?: boolean;
    minutes?: boolean;
    seconds?: boolean;
    miliseconds?: boolean;
  },
) => {
  const { hours, minutes, seconds, miliseconds } = params ?? {};
  const copyDate = new Date(date);
  hours && copyDate.setHours(type === 'start' ? 0 : 23);
  minutes && copyDate.setMinutes(type === 'start' ? 0 : 59);
  seconds && copyDate.setSeconds(type === 'start' ? 0 : 59);
  miliseconds && copyDate.setMilliseconds(type === 'start' ? 0 : 999);
  return copyDate;
};

const isInRangeWithoutTime = (date: Date, min: Date, max: Date) => {
  const minTime = min.getTime();
  const maxTime = max.getTime();
  const dateTime = [
    clearTime(date, 'start', {
      hours: true,
      minutes: true,
      seconds: true,
      miliseconds: true,
    }).getTime(),
    clearTime(date, 'end', {
      hours: true,
      minutes: true,
      seconds: true,
      miliseconds: true,
    }).getTime(),
  ];
  return (
    minTime <= dateTime[0] &&
    dateTime[0] <= maxTime &&
    minTime <= dateTime[1] &&
    dateTime[1] <= maxTime
  );
};

export const isEqualDates = (
  firstDate: Date,
  secondDate: Date,
  mode: DateTimePropType | undefined,
  timeType: 'hours' | 'minutes' | 'seconds' | undefined = 'hours',
) => {
  if (mode === 'time') {
    if (timeType === 'seconds') {
      return (
        clearTime(firstDate, 'start', { miliseconds: true }).getTime() ===
        clearTime(secondDate, 'start', { miliseconds: true }).getTime()
      );
    }
    return false;
  }
  const years = [firstDate.getFullYear(), secondDate.getFullYear()];
  const months = [firstDate.getMonth(), secondDate.getMonth()];
  const dates = [firstDate.getDate(), secondDate.getDate()];

  if (mode === 'year') {
    return years[0] === years[1];
  }
  if (mode === 'month') {
    return months[0] === months[1] && years[0] === years[1];
  }

  return (
    dates[0] === dates[1] && months[0] === months[1] && years[0] === years[1]
  );
};

const isInRange = (
  date: Date,
  minDate: Date,
  maxDate: Date,
  mode: DateTimePropType | undefined,
  timeType: 'hours' | 'minutes' | 'seconds' | undefined = 'hours',
) => {
  if (mode === 'year' || mode === 'month' || mode === 'date') {
    return isInRangeWithoutTime(date, minDate, maxDate);
  }
  const minTime = minDate.getTime();
  const maxTime = maxDate.getTime();
  const compare = minTime <= date.getTime() && date.getTime() <= maxTime;
  if (isEqualDates(date, maxDate, 'date', timeType)) {
    const dateTimes = [
      clearTime(date, 'start', {
        minutes: timeType === 'hours',
        seconds: timeType === 'hours' || timeType === 'minutes',
        miliseconds: false,
      }).getTime(),
      clearTime(date, 'end', {
        minutes: timeType === 'hours',
        seconds: timeType === 'hours' || timeType === 'minutes',
        miliseconds: false,
      }).getTime(),
    ];
    return (
      minTime <= dateTimes[0] &&
      dateTimes[0] <= maxTime &&
      minTime <= dateTimes[1] &&
      dateTimes[1] <= maxTime
    );
  }
  return compare;
};

export const isDisableDate = <TYPE extends DateTimePropType>(params: {
  date: Date;
  disableDates: DateTimePropDisableDates | undefined;
  mode?: DateTimePropType;
  timeType?: TYPE extends 'time' ? 'hours' | 'minutes' | 'seconds' : undefined;
}) => {
  const { disableDates, mode, date, timeType } = params;
  if (!disableDates) {
    return false;
  }
  return !!disableDates.find((compareDate) =>
    compareDate instanceof Date
      ? isEqualDates(compareDate, date, mode, timeType)
      : isInRange(date, compareDate[0], compareDate[1], mode, timeType),
  );
};
