import './DateTimeTypeTime.css';

import React, { forwardRef } from 'react';

import { cn } from '../../../utils/bem';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { DateTimeTime } from '../DateTimeTime/DateTimeTime';
import { DateTimeProps, getTimeTitle } from '../helpers';

export type DateTimeTypeTypeComponent = (
  props: Omit<DateTimeProps, 'type' | 'onChangeRange' | 'value' | 'view'> & {
    value?: Date;
  },
) => React.ReactElement | null;

const cnDateTimeTypeTime = cn('DateTimeTypeTime');

export const DateTimeTypeTime: DateTimeTypeTypeComponent = forwardRef((props, ref) => {
  const {
    locale,
    value,
    className,
    onChange,
    maxDate,
    minDate,
    multiplicityHours = 1,
    multiplicityMinutes = 1,
    multiplicitySeconds = 1,
    ...otherProps
  } = props;

  const label = getTimeTitle(value, multiplicityHours, multiplicityMinutes, multiplicitySeconds);

  return (
    <div {...otherProps} className={cnDateTimeTypeTime(null, [className])} ref={ref}>
      <DateTimeLabel align="center" className={cnDateTimeTypeTime('Label')} label={label} />
      <DateTimeTime
        locale={locale?.words}
        value={value}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        multiplicityHours={multiplicityHours}
        multiplicityMinutes={multiplicityMinutes}
        multiplicitySeconds={multiplicitySeconds}
      />
    </div>
  );
});
