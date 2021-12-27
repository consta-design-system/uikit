import './DateTime.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';

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

const cnDateTime = cn('DateTime');

export const DateTime: DateTimeComponent = forwardRef((props, ref) => {
  const { type = dateTimePropTypeDefault, renderAdditionalControls, ...otherProps } = props;

  const Component = getByMap(typeMap, type);

  return (
    <>
      <Component {...otherProps} ref={ref} />
      {renderAdditionalControls && (
        <div className={cnDateTime('Controls')}>{renderAdditionalControls()}</div>
      )}
    </>
  );
});

export * from './helpers/types';
