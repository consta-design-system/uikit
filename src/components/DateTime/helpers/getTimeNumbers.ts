import { range } from '##/utils/array';

import { TimeUnitOptions } from './types';

export const getTimeNumbers = (
  timeType: 'hours' | 'minutes' | 'seconds',
  options: TimeUnitOptions,
): number[] => {
  const minValue = 0;
  const maxValue = timeType === 'hours' ? 23 : 59;

  if (Array.isArray(options)) {
    const filtered = (options || []).filter(
      (n): n is number =>
        typeof n === 'number' &&
        Number.isInteger(n) &&
        n >= minValue &&
        n <= maxValue,
    );
    return Array.from(new Set(filtered)).sort((a, b) => a - b);
  }

  if (
    options &&
    typeof options === 'object' &&
    Object.keys(options).length === 0
  ) {
    return range(maxValue + 1);
  }

  const getClampedValue = (
    val: number | undefined,
    minVal: number,
    maxVal: number,
    defaultVal: number,
  ): number => {
    if (val === undefined || !Number.isFinite(val)) {
      return defaultVal;
    }
    return Math.max(minVal, Math.min(maxVal, val));
  };

  const step = getClampedValue(options.step, minValue, maxValue + 1, 1);
  let start = getClampedValue(options.start, minValue, maxValue, 0);
  let stop = getClampedValue(options.stop, minValue, maxValue, maxValue);

  if (step === 0) {
    return [];
  }

  if (start > stop) {
    [start, stop] = [stop, start];
  }

  const numSteps = Math.floor((stop - start) / step) + 1;
  return Array.from({ length: numSteps }, (_, i) => start + i * step);
};
