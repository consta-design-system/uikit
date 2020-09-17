import './DatePickerDateOutOfRangeTooptipContent.css';

import React from 'react';
import { format } from 'date-fns';

import { IconWarning } from '../../../icons/IconWarning/IconWarning';
import { cn } from '../../../utils/bem';
import { Text } from '../../Text/Text';
import { MakeDateOutOfRangeText, MinMaxDate } from '../types';

const cnDatePickerDateOutOfRangeTooptipContent = cn('DatePickerDateOutOfRangeTooptipContent');

type DateLimitProps = MinMaxDate & {
  makeText?: MakeDateOutOfRangeText;
};

function makeDateOutRangeTooltipText(minDate: string, maxDate: string): string {
  return `Укажите дату в промежутке ${minDate} - ${maxDate}`;
}
const formatOutOfRangeDate = (date: Date): string => format(date, 'dd.MM.yyyy');

export const DatePickerDateOutOfRangeTooptipContent: React.FC<DateLimitProps> = ({
  minDate,
  maxDate,
  makeText = makeDateOutRangeTooltipText,
}) => {
  return (
    <div className={cnDatePickerDateOutOfRangeTooptipContent()}>
      <IconWarning
        size="xs"
        view="alert"
        className={cnDatePickerDateOutOfRangeTooptipContent('IconWarning')}
      />
      <Text as="div" size="xs" view="primary" lineHeight="m">
        {makeText(formatOutOfRangeDate(minDate), formatOutOfRangeDate(maxDate))}
      </Text>
    </div>
  );
};
