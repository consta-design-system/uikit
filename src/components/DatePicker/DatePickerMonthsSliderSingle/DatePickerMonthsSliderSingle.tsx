import './DatePickerMonthsSliderSingle.css';

import React from 'react';
import { addMonths, endOfMonth, startOfMonth, subMonths } from 'date-fns';

import { cn } from '../../../utils/bem';
import { Text } from '../../Text/Text';
import { DatePickerMonthsSliderWrapper } from '../DatePickerMonthsSliderWrapper/DatePickerMonthsSliderWrapper';
import { getMonthTitle } from '../helpers';
import { MinMaxDate, RenderSliderProps } from '../types';

const cnDatePickerMonthsSliderSingle = cn('DatePickerMonthsSliderSingle');

const getIsGoToPrevMonthAllowed = (currentDate: Date, minDate: MinMaxDate['minDate']): boolean => {
  return endOfMonth(subMonths(currentDate, 1)) >= minDate;
};

const getIsGoToNextMonthAllowed = (currentDate: Date, maxDate: MinMaxDate['maxDate']): boolean => {
  return startOfMonth(addMonths(currentDate, 1)) <= maxDate;
};

const getTitle = (date: Date): string => {
  return `${getMonthTitle(date)} ${date.getFullYear()}`;
};

export const DatePickerMonthsSliderSingle: React.FC<RenderSliderProps<Date>> = ({
  currentVisibleDate,
  minDate,
  maxDate,
  onChange,
}) => {
  const isMovePrevAllowed = getIsGoToPrevMonthAllowed(currentVisibleDate, minDate);
  const isMoveNextAllowed = getIsGoToNextMonthAllowed(currentVisibleDate, maxDate);

  const handleMovePrev = () => {
    isMovePrevAllowed && onChange(subMonths(currentVisibleDate, 1));
  };

  const handleMoveNext = () => {
    isMoveNextAllowed && onChange(addMonths(currentVisibleDate, 1));
  };

  return (
    <DatePickerMonthsSliderWrapper
      onMovePrev={handleMovePrev}
      isMovePrevDisabled={!isMovePrevAllowed}
      onMoveNext={handleMoveNext}
      isMoveNextDisabled={!isMoveNextAllowed}
    >
      <Text
        className={cnDatePickerMonthsSliderSingle('SliderTitle')}
        as="div"
        size="m"
        transform="uppercase"
        weight="bold"
        view="primary"
        spacing="xs"
      >
        {getTitle(currentVisibleDate)}
      </Text>
    </DatePickerMonthsSliderWrapper>
  );
};
