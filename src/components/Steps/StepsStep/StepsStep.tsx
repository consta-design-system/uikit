import './StepsStep.css';

import React from 'react';

import { IconPropSize } from '../../../icons/Icon/Icon';
import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { StepsPropSize } from '../Steps';

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

export const StepsStep = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
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
  const iconSize = getSizeByMap(sizeMap, size);

  return (
    <button
      ref={ref}
      className={cnStepsStep({ size, active, disabled, completed, skipped }, [className])}
      type="button"
      title={label}
      onClick={clickHandler}
    >
      {completed && <IconCheck className={cnStepsStep('Icon')} size={iconSize} />}
      {label}
    </button>
  );
});
