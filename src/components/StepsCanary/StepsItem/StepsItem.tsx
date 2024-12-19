import './StepsItem.css';

import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { Badge, BadgePropSize } from '##/components/Badge';
import { Text, TextPropSize } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnCanary } from '##/utils/bem';

import { StepItemStatus, StepsPropSize } from '../StepsCanary';

export const cnStepsItem = cnCanary('StepsItem');

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
  labelWordWrap?: boolean;
};

const badgeSizeMap: Record<StepsPropSize, BadgePropSize> = {
  s: 'xs',
  m: 's',
  l: 's',
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
      labelWordWrap,
    } = props;

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      !active && !disabled && onChange?.(e);
    };

    return (
      <div
        className={cnStepsItem(
          { size, active, disabled, status, withIcon: !!icon },
          [className],
        )}
      >
        <button
          ref={ref}
          className={cnStepsItem('Button', [
            cnMixFlex({ flex: 'flex', gap: 'xs' }),
          ])}
          type="button"
          title={label}
          onClick={clickHandler}
          disabled={disabled}
        >
          {withNumber && (
            <Badge
              className={cnStepsItem('Badge', { status, active, disabled })}
              as="span"
              iconLeft={icon}
              label={icon ? undefined : number?.toString()}
              size={badgeSizeMap[size]}
              form="round"
            />
          )}
          <div
            className={cnMixFlex({
              flex: 'flex',
              gap: '2xs',
              direction: 'column',
            })}
          >
            <Text
              as="div"
              className={cnStepsItem('Label', { wordWrap: labelWordWrap }, [
                cnMixFlex({ flex: 'flex', gap: 'xs' }),
              ])}
              size={size}
              lineHeight="m"
            >
              {label}
            </Text>
            {description && (
              <Text
                className={cnStepsItem('Description')}
                size={descriptionSizeMap[size]}
                lineHeight="m"
              >
                {description}
              </Text>
            )}
          </div>
        </button>
      </div>
    );
  },
);
