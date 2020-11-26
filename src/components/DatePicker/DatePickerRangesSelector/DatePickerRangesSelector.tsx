import './DatePickerRangesSelector.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { DateRange, MinMaxDate } from '../types';

export type Props = {
  currentVisibleDate: Date;
  onChange: (value: DateRange) => void;
  makeRanges: (
    options: { visibleDate: Date } & MinMaxDate,
  ) => Array<{ range: DateRange; title: string }>;
} & MinMaxDate;

const cnDatePickerRangesSelector = cn('DatePickerRangesSelector');

export const DatePickerRangesSelector: React.FC<Props> = ({
  currentVisibleDate,
  minDate,
  maxDate,
  onChange,
  makeRanges,
}) => {
  const ranges = makeRanges({ visibleDate: currentVisibleDate, minDate, maxDate });

  return (
    <div className={cnDatePickerRangesSelector()}>
      <div className={cnDatePickerRangesSelector('Ranges')}>
        {ranges.map((dateRange, idx) => (
          <Button
            key={idx}
            label={dateRange.title}
            className={cnDatePickerRangesSelector('Range')}
            size="xs"
            view="ghost"
            disabled={!dateRange.range.length}
            onClick={(): void => onChange(dateRange.range)}
          />
        ))}
      </div>
    </div>
  );
};
