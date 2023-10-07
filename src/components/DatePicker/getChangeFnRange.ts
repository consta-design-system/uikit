import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';

import { DateRange } from '../../utils/types/Date';
import { datePickerErrorTypes, DatePickerPropOnError } from './types';

type OnChange = (
  value: DateRange | null,
  props: { e: Event; value: DateRange | null },
) => void;

const handleChange = (
  e: Event,
  start: Date | undefined | null,
  end: Date | undefined | null,
  onChange: OnChange | undefined,
  onError: DatePickerPropOnError | undefined,
) => {
  if (!onChange) {
    return;
  }

  if (start && end) {
    if (isBefore(start, end) || isEqual(start, end)) {
      onChange([start, end], { e, value: [start, end] });
      return;
    }
    onChange([start, undefined], { e, value: [start, undefined] });
    onError && onError({ type: datePickerErrorTypes[2], date: [start, end] });
    return;
  }

  if (start) {
    onChange([start, undefined], { e, value: [start, undefined] });
    return;
  }

  if (end) {
    onChange([undefined, end], { e, value: [undefined, end] });
    return;
  }

  onChange(null, { e, value: null });
};

export const getChangeFnRange = (
  onChange: OnChange | undefined,
  onError: DatePickerPropOnError | undefined,
  currentValue: DateRange | null | undefined,
) => {
  return [
    (value: Date | null, props: { e: Event }) => {
      handleChange(props.e, value, currentValue?.[1], onChange, onError);
    },
    (value: Date | null, props: { e: Event }) => {
      handleChange(props.e, currentValue?.[0], value, onChange, onError);
    },
  ] as const;
};
