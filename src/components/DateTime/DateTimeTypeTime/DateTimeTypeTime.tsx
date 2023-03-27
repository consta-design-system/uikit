import './DateTimeTypeTime.css';

import React, { forwardRef, useEffect, useMemo } from 'react';

import { cn } from '../../../utils/bem';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { DateTimeTimeColumn } from '../DateTimeTimeColumn/DateTimeTimeColumn';
import { DateTimeTypeComponent, getTimeTitle, moveTypes } from '../helpers';
import { dateTimeTimePropLocaleDefault, useTimeItems } from './helpers';

const cnDateTimeTypeTime = cn('DateTimeTypeTime');

export const DateTimeTypeTime: DateTimeTypeComponent<'time'> = forwardRef(
  (props, ref) => {
    const {
      locale: localeProp,
      value,
      className,
      onChange,
      maxDate,
      minDate,
      disableDates,
      multiplicityHours = 1,
      multiplicityMinutes = 1,
      multiplicitySeconds = 1,
      onMove,
      ...otherProps
    } = props;

    useEffect(() => {
      onMove?.(moveTypes[3]);
    }, []);

    const locale = useMemo(
      () => ({ ...dateTimeTimePropLocaleDefault, ...localeProp?.words }),
      [
        localeProp?.words?.hours,
        localeProp?.words?.minutes,
        localeProp?.words?.seconds,
      ],
    );

    const time = useTimeItems(
      value,
      multiplicityHours,
      multiplicityMinutes,
      multiplicitySeconds,
      onChange,
      minDate,
      maxDate,
      disableDates,
    );

    const [hours, minutes, seconds] = time;

    const label = getTimeTitle(
      value,
      multiplicityHours,
      multiplicityMinutes,
      multiplicitySeconds,
    );
    const labelLenght = time.filter((item) => item.length).length;

    return (
      <div
        {...otherProps}
        className={cnDateTimeTypeTime(null, [className])}
        ref={ref}
      >
        <DateTimeLabel
          align="center"
          className={cnDateTimeTypeTime('Label')}
          style={{ ['--label-length' as string]: labelLenght }}
          label={label}
        />
        <div className={cnDateTimeTypeTime('Grid')}>
          <DateTimeTimeColumn label={locale.hours} items={hours} />
          <DateTimeTimeColumn label={locale.minutes} items={minutes} />
          <DateTimeTimeColumn label={locale.seconds} items={seconds} />
        </div>
      </div>
    );
  },
);
