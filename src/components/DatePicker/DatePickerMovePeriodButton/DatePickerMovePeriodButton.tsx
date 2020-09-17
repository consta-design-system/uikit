import './DatePickerMovePeriodButton.css';

import React from 'react';

import { IconBackward } from '../../../icons/IconBackward/IconBackward';
import { IconForward } from '../../../icons/IconForward/IconForward';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';

const cnDatePickerMovePeriodButton = cn('DatePickerMovePeriodButton');

export const DatePickerMovePeriodButton: React.FC<{
  direction: 'backward' | 'forward';
  onClick: () => void;
  disabled: boolean;
}> = ({ direction, onClick, disabled }) => {
  return (
    <Button
      className={cnDatePickerMovePeriodButton()}
      size="m"
      view="clear"
      onlyIcon
      iconLeft={direction === 'backward' ? IconBackward : IconForward}
      iconSize="m"
      disabled={disabled}
      onClick={onClick}
    />
  );
};
