import './DatePickerActionButtons.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { DateRange, MinMaxDate } from '../types';

import { getQuarters } from './helpers';

export type Props = {
  currentVisibleDate: Date;
  showQuartersSelector: boolean;
  onSelect: (value: DateRange) => void;
  onApply: () => void;
} & MinMaxDate;

const cnDatePickerActionButtons = cn('DatePickerActionButtons');

export const DatePickerActionButtons: React.FC<Props> = ({
  currentVisibleDate,
  showQuartersSelector,
  minDate,
  maxDate,
  onSelect,
  onApply,
}) => {
  const currentYear = currentVisibleDate.getFullYear();
  const quarters = getQuarters({ date: currentVisibleDate, minDate, maxDate });

  return (
    <div className={cnDatePickerActionButtons()}>
      <div className={cnDatePickerActionButtons('Quarters')}>
        {showQuartersSelector &&
          quarters.map((quarter, idx) => (
            <Button
              key={idx}
              label={`${idx + 1} кв. ${currentYear}`}
              className={cnDatePickerActionButtons('Quarter')}
              size="xs"
              view="ghost"
              disabled={!quarter.length}
              onClick={(): void => onSelect(quarter)}
            />
          ))}
      </div>
      <Button label="Выбрать" size="xs" view="primary" onClick={onApply} />
    </div>
  );
};
