import React, { forwardRef, useRef } from 'react';

import { usePropsHandler } from '##/components/EventInterceptor/usePropsHandler';
import { useForkRef } from '##/hooks/useForkRef/useForkRef';
import { getByMap } from '##/utils/getByMap';

import { DateTimeTypeDate } from './DateTimeTypeDate/DateTimeTypeDate';
import { DateTimeTypeDateTime } from './DateTimeTypeDateTime/DateTimeTypeDateTime';
import { DateTimeTypeMonth } from './DateTimeTypeMonth/DateTimeTypeMonth';
import { DateTimeTypeTime } from './DateTimeTypeTime/DateTimeTypeTime';
import { DateTimeTypeYear } from './DateTimeTypeYear/DateTimeTypeYear';
import {
  DateTimeComponent,
  DateTimePropType,
  dateTimePropTypeDefault,
  DateTimeTypeComponent,
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
  const { type = dateTimePropTypeDefault, ...otherProps } = usePropsHandler(
    COMPONENT_NAME,
    props,
    dateTimeRef,
  );

  const Component = getByMap(typeMap, type);

  return <Component {...otherProps} ref={useForkRef([ref, dateTimeRef])} />;
});

export * from './helpers/types';
