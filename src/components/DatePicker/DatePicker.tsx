import React, { forwardRef, useMemo, useRef } from 'react';

import { useForkRef } from '##/hooks/useForkRef/useForkRef';
import { maxDateDefault, minDateDefault } from '##/utils/date';
import { getByMap } from '##/utils/getByMap';

import { TimeOptions } from '../DateTime';
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
    timeOptions,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, datePickerRef);

  // TODO: major - удалить multiplicity* props конвертацию, используйте timeOptions напрямую
  const effectiveTimeOptions = useMemo((): TimeOptions => {
    return {
      hours:
        timeOptions?.hours ??
        (multiplicityHours !== undefined
          ? { step: multiplicityHours }
          : undefined),
      minutes:
        timeOptions?.minutes ??
        (multiplicityMinutes !== undefined
          ? { step: multiplicityMinutes }
          : undefined),
      seconds:
        timeOptions?.seconds ??
        (multiplicitySeconds !== undefined
          ? { step: multiplicitySeconds }
          : undefined),
    };
  }, [
    timeOptions,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
  ]);

  const timeProps = useMemo(
    () =>
      isTypeWithTime(type)
        ? {
            timeOptions: effectiveTimeOptions,
          }
        : undefined,
    [type, effectiveTimeOptions],
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
