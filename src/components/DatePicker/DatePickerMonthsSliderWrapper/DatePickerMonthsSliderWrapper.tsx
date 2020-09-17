import './DatePickerMonthsSliderWrapper.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { DatePickerMovePeriodButton } from '../DatePickerMovePeriodButton/DatePickerMovePeriodButton';

const cnDatePickerMonthsSliderWrapper = cn('DatePickerMonthsSliderWrapper');

type MonthsPanelProps = {
  children: React.ReactNode;
  onMovePrev: () => void;
  isMovePrevDisabled: boolean;
  onMoveNext: () => void;
  isMoveNextDisabled: boolean;
};

export const DatePickerMonthsSliderWrapper: React.FC<MonthsPanelProps> = ({
  children,
  onMovePrev,
  isMovePrevDisabled,
  onMoveNext,
  isMoveNextDisabled,
}) => {
  return (
    <div className={cnDatePickerMonthsSliderWrapper()}>
      <DatePickerMovePeriodButton
        direction="backward"
        onClick={onMovePrev}
        disabled={isMovePrevDisabled}
      />
      {children}
      <DatePickerMovePeriodButton
        direction="forward"
        onClick={onMoveNext}
        disabled={isMoveNextDisabled}
      />
    </div>
  );
};
