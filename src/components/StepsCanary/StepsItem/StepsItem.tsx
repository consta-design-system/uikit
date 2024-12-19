import './StepsItem.css';

import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { Badge, BadgePropSize, BadgePropStatus } from '##/components/Badge';
import { Text, TextPropSize } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
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

const badgeSizeMap: Record<StepsPropSize, BadgePropSize> = {
  s: 'xs',
  m: 's',
  l: 's',
};

const badgeStatusMap: Record<StepItemStatus | 'default', BadgePropStatus> = {
  default: 'system',
  resolved: 'normal',
  error: 'alert',
};

const descriptionSizeMap: Record<StepsPropSize, TextPropSize> = {
  s: '2xs',
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
      status,
      onChange,
      number,
      icon,
      description,
      withNumber,
      className,
    } = props;

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      !active && !disabled && onChange?.(e);
    };

    return (
      <div
        className={cnStepsStep(
          { size, active, disabled, status, withIcon: !!icon },
          [className],
        )}
      >
        <button
          ref={ref}
          className={cnStepsStep('Button', [
            cnMixFlex({
              flex: 'flex',
              direction: 'column',
              gap: '2xs',
            }),
            className,
          ])}
          type="button"
          title={label}
          onClick={clickHandler}
          disabled={disabled}
        >
          <Text
            as="div"
            className={cnStepsStep('Label', [
              cnMixFlex({ flex: 'flex', align: 'center', gap: 'xs' }),
            ])}
            size={size}
            lineHeight="m"
          >
            {withNumber && (
              <Badge
                className={cnStepsStep('Badge')}
                as="span"
                iconLeft={icon}
                label={icon ? undefined : number?.toString()}
                size={badgeSizeMap[size]}
                status={
                  disabled ? 'disabled' : badgeStatusMap[status || 'default']
                }
                form="round"
              />
            )}
            {label}
          </Text>

          <Text
            className={cnStepsStep('Description')}
            size={descriptionSizeMap[size]}
            lineHeight="m"
          >
            {description}
          </Text>
        </button>
        <div
          className={cnStepsStep('Line', {
            status: active ? status : undefined,
            disabled,
          })}
        />
      </div>
    );
  },
);
