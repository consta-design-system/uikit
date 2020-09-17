import './DatePickerRangeControl.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Text } from '../../Text/Text';
import { DatePickerInputDate } from '../DatePickerInputDate/DatePickerInputDate';
import { DateControlType } from '../types';

export type DateRange = [Date?, Date?];

const cnDatePickerRangeControl = cn('DatePickerRangeControl');

export const DatePickerRangeControl: React.FC<DateControlType<DateRange>> = (props) => {
  const { value, onChange, tooltipContent, ...commonProps } = props;
  const [startDate, endDate] = value || [undefined, undefined];

  return (
    <>
      <DatePickerInputDate
        {...commonProps}
        value={startDate}
        onChange={(date?: Date): void => onChange([date, endDate])}
      />
      <Text as="span" view="primary" className={cnDatePickerRangeControl('Delimiter')}>
        –
      </Text>
      <DatePickerInputDate
        {...commonProps}
        value={endDate}
        onChange={(date?: Date): void => onChange([startDate, date])}
        tooltipContent={tooltipContent}
      />
    </>
  );
};
