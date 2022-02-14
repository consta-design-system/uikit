import React, { forwardRef } from 'react';

import { maxDateDefault, minDateDefault } from '../../utils/date';
import { getByMap } from '../../utils/getByMap';

import { DatePickerTypeDate } from './DatePickerTypeDate/DatePickerTypeDate';
import { DatePickerTypeDateRange } from './DatePickerTypeDateRange/DatePickerTypeDateRange';
import { DatePickerTypeDateTime } from './DatePickerTypeDateTime/DatePickerTypeDateTime';
import { DatePickerTypeDateTimeRange } from './DatePickerTypeDateTimeRange/DatePickerTypeDateTimeRange';
import {
  DatePickerComponent,
  DatePickerPropType,
  datePickerPropTypeDefault,
  DatePickerTypeComponent,
} from './helpers';

const typeMap: Record<DatePickerPropType, DatePickerTypeComponent<DatePickerPropType>> = {
  'date': DatePickerTypeDate,
  'date-range': DatePickerTypeDateRange,
  'date-time': DatePickerTypeDateTime,
  'date-time-range': DatePickerTypeDateTimeRange,
};

export const DatePicker: DatePickerComponent = forwardRef((props, ref) => {
  const {
    type = datePickerPropTypeDefault,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    multiplicityMinutes,
    multiplicitySeconds,
    multiplicityHours,
    ...otherProps
  } = props;

  const timeProps =
    type === 'date-time'
      ? {
          multiplicityMinutes,
          multiplicitySeconds,
          multiplicityHours,
        }
      : undefined;

  const Component = getByMap(typeMap, type);

  return <Component {...otherProps} {...timeProps} minDate={minDate} maxDate={maxDate} ref={ref} />;
});

export * from './helpers';
