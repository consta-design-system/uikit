import React, { forwardRef, useMemo, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { maxDateDefault, minDateDefault } from '../../utils/date';
import { getByMap } from '../../utils/getByMap';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { DatePickerTypeDate } from './DatePickerTypeDate/DatePickerTypeDate';
import { DatePickerTypeDateRange } from './DatePickerTypeDateRange/DatePickerTypeDateRange';
import { DatePickerTypeDateTime } from './DatePickerTypeDateTime/DatePickerTypeDateTime';
import { DatePickerTypeDateTimeRange } from './DatePickerTypeDateTimeRange/DatePickerTypeDateTimeRange';
import { DatePickerTypeMonth } from './DatePickerTypeMonth/DatePickerTypeMonth';
import { DatePickerTypeMonthRange } from './DatePickerTypeMonthRange/DatePickerTypeMonthRange';
import { DatePickerTypeTime } from './DatePickerTypeTime/DatePickerTypeTime';
import { DatePickerTypeYear } from './DatePickerTypeYear/DatePickerTypeYear';
import { DatePickerTypeYearRange } from './DatePickerTypeYearRange/DatePickerTypeYearRange';
import { isTypeWithTime } from './helpers';
import {
  DatePickerComponent,
  DatePickerPropType,
  datePickerPropTypeDefault,
  DatePickerTypeComponent,
} from './types';

const typeMap: Record<
  DatePickerPropType,
  DatePickerTypeComponent<DatePickerPropType>
> = {
  'date': DatePickerTypeDate,
  'date-range': DatePickerTypeDateRange,
  'date-time': DatePickerTypeDateTime,
  'date-time-range': DatePickerTypeDateTimeRange,
  'time': DatePickerTypeTime,
  'year': DatePickerTypeYear,
  'year-range': DatePickerTypeYearRange,
  'month': DatePickerTypeMonth,
  'month-range': DatePickerTypeMonthRange,
};

export const COMPONENT_NAME = 'DatePicker' as const;

export const DatePicker: DatePickerComponent = forwardRef((props, ref) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const {
    type = datePickerPropTypeDefault,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    labelPosition = 'top',
    multiplicityMinutes,
    multiplicitySeconds,
    multiplicityHours,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, datePickerRef);

  const timeProps = useMemo(
    () =>
      isTypeWithTime(type)
        ? {
            multiplicityMinutes,
            multiplicitySeconds,
            multiplicityHours,
          }
        : undefined,
    [type, multiplicityMinutes, multiplicitySeconds, multiplicityHours],
  );

  const Component = getByMap(typeMap, type);

  return (
    <Component
      {...otherProps}
      {...timeProps}
      labelPosition={labelPosition}
      minDate={minDate}
      maxDate={maxDate}
      ref={useForkRef([ref, datePickerRef])}
    />
  );
});

export * from './helpers';
export * from './types';
