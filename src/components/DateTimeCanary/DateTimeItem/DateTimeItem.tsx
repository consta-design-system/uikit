import './DateTimeItem.css';

import { classnames } from '@bem-react/classnames';
import React, { forwardRef } from 'react';

import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { useTheme } from '../../Theme/Theme';

export type DateTimeItemProps = PropsWithJsxAttributes<
  {
    label: number | string;
    current?: boolean;
    selected?: boolean;
    disabled?: boolean;
    event?: boolean;
    role?: never;
    children?: never;
  },
  'button'
>;

export const cnDateTimeItem = cn('DateTimeItem');

export const DateTimeItem = forwardRef<HTMLButtonElement, DateTimeItemProps>(
  (props, ref) => {
    const { label, current, selected, event, disabled, ...otherProps } = props;
    const { themeClassNames } = useTheme();

    const className =
      selected && !disabled
        ? classnames(props.className, themeClassNames.color.accent)
        : props.className;

    return (
      <button
        {...otherProps}
        ref={ref}
        className={cnDateTimeItem({ event, current, disabled, selected }, [
          className,
          cnMixFocus(),
        ])}
        type="button"
        disabled={disabled}
      >
        {label}
      </button>
    );
  },
);
