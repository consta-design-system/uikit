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
  return (callbackProps) => {
    if (typeof props.onChange === 'function') {
      props.onChange(callbackProps);
    }

    if (typeof props.onChangeRange === 'function') {
      const currentValue: DateRange = (Array.isArray(props.value)
        ? props.value
        : [props.value, undefined]) || [undefined, undefined];

      const [startDate, endDate] = currentValue;

      if (
        isDefined(startDate) &&
        props.isEqualUnit(startDate, callbackProps.value)
      ) {
        return props.onChangeRange({
          e: callbackProps.e,
          value: [endDate, undefined],
        });
      }

      if (
        isDefined(endDate) &&
        props.isEqualUnit(endDate, callbackProps.value)
      ) {
        return props.onChangeRange({
          e: callbackProps.e,
          value: [startDate, undefined],
        });
      }

      if (isDefined(startDate)) {
        return props.onChangeRange({
          e: callbackProps.e,
          value:
            startDate > callbackProps.value
              ? [callbackProps.value, startDate]
              : [startDate, callbackProps.value],
        });
      }

      if (isDefined(endDate)) {
        return props.onChangeRange({
          e: callbackProps.e,
          value:
            endDate > callbackProps.value
              ? [callbackProps.value, endDate]
              : [endDate, callbackProps.value],
        });
      }

      props.onChangeRange({
        e: callbackProps.e,
        value: [callbackProps.value, undefined],
      });
    }
  };
}
