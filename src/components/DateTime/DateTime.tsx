import React, { forwardRef } from 'react';

import { getSizeByMap } from '../../utils/getSizeByMap';

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

const typeMap: Record<DateTimePropType, DateTimeTypeComponent<DateTimePropType>> = {
  'date': DateTimeTypeDate,
  'month': DateTimeTypeMonth,
  'year': DateTimeTypeYear,
  'time': DateTimeTypeTime,
  'date-time': DateTimeTypeDateTime,
} as const;

export const DateTime: DateTimeComponent = forwardRef((props, ref) => {
  const { type = dateTimePropTypeDefault, ...otherProps } = props;

  const Component = getSizeByMap(typeMap, type);

  return <Component {...otherProps} ref={ref} />;
});

export * from './helpers/types';
