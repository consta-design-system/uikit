import React, { forwardRef, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { maxDateDefault, minDateDefault } from '../../utils/date';
import { getByMap } from '../../utils/getByMap';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

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

export const COMPONENT_NAME = 'DatePicker' as const;

export const DatePicker: DatePickerComponent = forwardRef((props, ref) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const {
    type = datePickerPropTypeDefault,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    multiplicityMinutes,
    multiplicitySeconds,
    multiplicityHours,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, datePickerRef);

  const timeProps =
    type === 'date-time'
      ? {
          multiplicityMinutes,
          multiplicitySeconds,
          multiplicityHours,
        }
      : undefined;

  const Component = getByMap(typeMap, type);

  return (
    <Component
      {...otherProps}
      {...timeProps}
      minDate={minDate}
      maxDate={maxDate}
      ref={useForkRef([ref, datePickerRef])}
    />
  );
});

export * from './helpers';
