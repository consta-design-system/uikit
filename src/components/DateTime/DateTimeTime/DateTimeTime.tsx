import './DateTimeTime.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { DateTimeTimeColumn } from '../DateTimeTimeColumn/DateTimeTimeColumn';

import { DateTimeTimePropLocaleDefault, DateTimeTimeProps, useTimeItems } from './helpers';

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
    locale = DateTimeTimePropLocaleDefault,
    ...otherProps
  } = props;

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
