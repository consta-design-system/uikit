import './StepsItem.css';

import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { cnCanary } from '##/utils/bem';

import { StepItemStatus, StepsPropSize } from '../StepsCanary';

export const cnStepsStep = cnCanary('StepsItem');

type Props = {
  size: StepsPropSize;
  label: string;
  number?: number;
  active?: boolean;
  disabled?: boolean;
  status?: StepItemStatus;
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  icon?: IconComponent;
  description?: string;
  withNumber?: boolean;
};

const sizeMap: Record<StepsPropSize, IconPropSize> = {
  m: 'xs',
  s: 'xs',
  l: 's',
};

export const StepsStep = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const {
      size,
      label,
      active = false,
      disabled = false,
      status,
      onChange,
      number,
      icon: Icon,
      description,
      withNumber,
      className,
    } = props;

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      !active && !disabled && onChange?.(e);
    };
    const iconSize = sizeMap[size];

    return (
      <>
        <button
          ref={ref}
          className={cnStepsStep(
            { size, active, disabled, status, withIcon: !!Icon },
            [className],
          )}
          type="button"
          title={label}
          onClick={clickHandler}
        >
          {withNumber && (
            <span className={cnStepsStep('Number')}>
              {Icon ? (
                <Icon className={cnStepsStep('Icon')} size={iconSize} />
              ) : (
                number
              )}
            </span>
          )}
          <span className={cnStepsStep('Label')}>{label}</span>
        </button>
        <div className={cnStepsStep('Line', { status, active, disabled })}>
          line
        </div>
      </>
    );
  },
);
