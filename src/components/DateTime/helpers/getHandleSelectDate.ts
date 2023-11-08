import { isDefined } from '../../../utils/type-guards';
import { DateRange } from '../../../utils/types/Date';
import {
  DateTimePropOnChange,
  DateTimePropOnChangeRange,
  DateTimePropValue,
  HandleSelectDate,
  СapableRangeType,
} from './types';

type GetHandleSelectDateProps = {
  isEqualUnit: (date1: Date, date2: Date) => boolean;
  value?: DateTimePropValue<СapableRangeType>;
  onChange?: DateTimePropOnChange;
  onChangeRange?: DateTimePropOnChangeRange<СapableRangeType>;
  minDate?: Date;
  maxDate?: Date;
};

export function getHandleSelectDate(
  props: GetHandleSelectDateProps,
): HandleSelectDate {
  return (value, { e }) => {
    if (typeof props.onChange === 'function') {
      props.onChange(value, { e });
    }

    if (typeof props.onChangeRange === 'function') {
      const currentValue: DateRange = (Array.isArray(props.value)
        ? props.value
        : [props.value, undefined]) || [undefined, undefined];

      const [startDate, endDate] = currentValue;

      if (isDefined(startDate) && props.isEqualUnit(startDate, value)) {
        return props.onChangeRange([endDate, undefined], {
          e,
        });
      }

      if (isDefined(endDate) && props.isEqualUnit(endDate, value)) {
        return props.onChangeRange([startDate, undefined], {
          e,
        });
      }

      if (isDefined(startDate)) {
        const newValue: DateRange =
          startDate > value ? [value, startDate] : [startDate, value];
        return props.onChangeRange(newValue, {
          e,
        });
      }

      if (isDefined(endDate)) {
        const newValue: DateRange =
          endDate > value ? [value, endDate] : [endDate, value];
        return props.onChangeRange(newValue, {
          e,
        });
      }

      props.onChangeRange([value, undefined], {
        e,
      });
    }
  };
}
