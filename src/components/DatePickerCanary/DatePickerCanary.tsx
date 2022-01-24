import React, { forwardRef } from 'react';

import { maxDateDefault, minDateDefault } from '../../utils/date';
import { getByMap } from '../../utils/getByMap';

import { DatePickerTypeDate } from './DatePickerTypeDate/DatePickerTypeDate';
import { DatePickerTypeDateRange } from './DatePickerTypeDateRange/DatePickerTypeDateRange';
import { DatePickerTypeDateTime } from './DatePickerTypeDateTime/DatePickerTypeDateTime';
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
};

export const DatePicker: DatePickerComponent = forwardRef((props, ref) => {
  const {
    type = datePickerPropTypeDefault,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    ...otherProps
  } = props;

  const Component = getByMap(typeMap, type);

  return <Component {...otherProps} minDate={minDate} maxDate={maxDate} ref={ref} />;
});

export * from './helpers';
