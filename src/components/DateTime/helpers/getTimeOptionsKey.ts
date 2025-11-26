import { TimeOptions, TimeUnitOptions } from './types';

const getTimeUnitOptionsKey = (
  unitOption?: TimeUnitOptions,
  defaultValue: string = 'default',
  separator: string = ',',
): string => {
  if (!unitOption) return defaultValue;

  if (Array.isArray(unitOption)) {
    return `[${[...unitOption].sort((a, b) => a - b).join(',')}]`;
  }

  const { start, stop, step } = unitOption;
  return `{${[
    start ?? defaultValue,
    stop ?? defaultValue,
    step ?? defaultValue,
  ].join(separator)}}`;
};

export const getTimeOptionsKey = (
  timeOptions?: TimeOptions,
  defaultValue: string = 'default',
  unitSeparator: string = '|',
  paramSeparator: string = ',',
): string => {
  if (!timeOptions) return defaultValue;

  return [
    getTimeUnitOptionsKey(timeOptions.hours, defaultValue, paramSeparator),
    getTimeUnitOptionsKey(timeOptions.minutes, defaultValue, paramSeparator),
    getTimeUnitOptionsKey(timeOptions.seconds, defaultValue, paramSeparator),
  ].join(unitSeparator);
};
