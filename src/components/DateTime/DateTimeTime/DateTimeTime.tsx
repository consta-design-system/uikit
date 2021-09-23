import './DateTimeTime.css';

import React, { useMemo } from 'react';

import { cn } from '../../../utils/bem';
import { DateTimeTimeColumn } from '../DateTimeTimeColumn/DateTimeTimeColumn';

import { dateTimeTimePropLocaleDefault, DateTimeTimeProps, useTimeItems } from './helpers';

export const cnDateTimeTime = cn('DateTimeTime');

export const DateTimeTime: React.FC<DateTimeTimeProps> = (props) => {
  const {
    className,
    value,
    onChange,
    maxDate,
    minDate,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
    locale: localeProp,
    ...otherProps
  } = props;

  const locale = useMemo(() => ({ ...dateTimeTimePropLocaleDefault, ...localeProp }), [
    localeProp?.hours,
    localeProp?.minutes,
    localeProp?.seconds,
  ]);

  const [hours, minutes, seconds] = useTimeItems(
    value,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
    onChange,
    minDate,
    maxDate,
  );

  return (
    <div {...otherProps} className={cnDateTimeTime(null, [className])}>
      <DateTimeTimeColumn label={locale.hours} items={hours} />
      <DateTimeTimeColumn label={locale.minutes} items={minutes} />
      <DateTimeTimeColumn label={locale.seconds} items={seconds} />
    </div>
  );
};
