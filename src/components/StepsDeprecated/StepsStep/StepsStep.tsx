import './StepsStep.css';

import { IconPropSize } from '@consta/icons/Icon';
import { IconCheck } from '@consta/icons/IconCheck';
import React from 'react';

import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { StepsPropSize } from '../StepsDeprecated';

export const cnStepsStep = cn('StepsStep');

type Props = {
  size: StepsPropSize;
  label: string;
  active?: boolean;
  disabled?: boolean;
  completed?: boolean;
  skipped?: boolean;
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const sizeMap: Record<StepsPropSize, IconPropSize> = {
  m: 'xs',
  l: 's',
};

export const StepsStep = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const {
      size,
      label,
      active = false,
      disabled = false,
      completed = false,
      skipped = false,
      onChange,
      className,
    } = props;

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      !active && !disabled && onChange?.(e);
    };
    const iconSize = getByMap(sizeMap, size);

    return (
      <button
        ref={ref}
        className={cnStepsStep({ size, active, disabled, completed, skipped }, [
          className,
        ])}
        type="button"
        title={label}
        onClick={clickHandler}
      >
        {completed && (
          <IconCheck className={cnStepsStep('Icon')} size={iconSize} />
        )}
        <span>{label}</span>
      </button>
    );
  },
);
