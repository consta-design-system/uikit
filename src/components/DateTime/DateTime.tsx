import React, { forwardRef, useMemo, useRef } from 'react';

import { usePropsHandler } from '##/components/EventInterceptor/usePropsHandler';
import { useForkRef } from '##/hooks/useForkRef/useForkRef';
import { getByMap } from '##/utils/getByMap';

import { DateTimeTypeDate } from './DateTimeTypeDate/DateTimeTypeDate';
import { DateTimeTypeDateTime } from './DateTimeTypeDateTime/DateTimeTypeDateTime';
import { DateTimeTypeMonth } from './DateTimeTypeMonth/DateTimeTypeMonth';
import { DateTimeTypeTime } from './DateTimeTypeTime/DateTimeTypeTime';
import { DateTimeTypeYear } from './DateTimeTypeYear/DateTimeTypeYear';
import { isTypeWithTime } from './helpers';
import {
  DateTimeComponent,
  DateTimePropType,
  dateTimePropTypeDefault,
  DateTimeTypeComponent,
  TimeOptions,
} from './helpers/types';

const typeMap: Record<
  DateTimePropType,
  DateTimeTypeComponent<DateTimePropType>
> = {
  'date': DateTimeTypeDate,
  'month': DateTimeTypeMonth,
  'year': DateTimeTypeYear,
  'time': DateTimeTypeTime,
  'date-time': DateTimeTypeDateTime,
} as const;

export const COMPONENT_NAME = 'DateTime' as const;

export const DateTime: DateTimeComponent = forwardRef((props, ref) => {
  const dateTimeRef = useRef<HTMLDivElement>(null);
  const {
    type = dateTimePropTypeDefault,
    timeOptions,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, dateTimeRef);

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
      isTypeWithTime(type) ? { timeOptions: effectiveTimeOptions } : undefined,
    [type, effectiveTimeOptions],
  );

  const Component = getByMap(typeMap, type);

  return (
    <Component
      {...otherProps}
      {...timeProps}
      ref={useForkRef([ref, dateTimeRef])}
    />
  );
});

export * from './helpers/types';
