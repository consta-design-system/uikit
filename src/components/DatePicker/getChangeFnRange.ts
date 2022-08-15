import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';

import { DateRange } from '../../utils/types/Date';
import { datePickerErrorTypes, DatePickerPropOnError } from './types';

type OnChange = (props: { e: Event; value: DateRange | null }) => void;

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
      onChange({ e, value: [start, end] });
      return;
    }
    onChange({ e, value: [start, undefined] });
    onError && onError({ type: datePickerErrorTypes[2], date: [start, end] });
    return;
  }

  if (start) {
    onChange({ e, value: [start, undefined] });
    return;
  }

  if (end) {
    onChange({ e, value: [undefined, end] });
    return;
  }

  onChange({ e, value: null });
};

export const getChangeFnRange = (
  onChange: OnChange | undefined,
  onError: DatePickerPropOnError | undefined,
  value: DateRange | null | undefined,
) => {
  return [
    (props: { e: Event; value: Date | null }) => {
      handleChange(props.e, props.value, value?.[1], onChange, onError);
    },
    (props: { e: Event; value: Date | null }) => {
      handleChange(props.e, value?.[0], props.value, onChange, onError);
    },
  ] as const;
};
