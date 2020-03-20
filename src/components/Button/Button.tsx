import './Button.css';
import React, { Fragment, FocusEventHandler, ElementType } from 'react';
import { cn } from '../../utils/bem';
import { IIconProps } from '../Icon';
import * as wp from '../../utils/whitepaper/whitepaper';

const cnButton = cn('button');

export type ButtonProps = {
  size: 'xs' | 's' | 'm' | 'l';
  view: 'clear' | 'ghost' | 'primary' | 'secondary';
  width?: 'default' | 'full';
  form:
    | 'default'
    | 'brick'
    | 'round'
    | 'brick-round'
    | 'round-brick'
    | 'brick-default'
    | 'default-brick';
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  tabIndex?: number;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
  label: string;
  type?: 'submit' | 'reset' | 'button';
  iconLeft?: React.FC<IIconProps>;
  iconRight?: React.FC<IIconProps>;
  as?: ElementType;
};

const Button: React.FC<ButtonProps | any> = (props) => {
  const {
    size = 'm',
    view = 'primary',
    width,
    form = 'default',
    iconLeft,
    iconRight,
    label,
    className,
    onClick,
    onBlur,
    disabled,
    type,
    tabIndex,
    as = 'button',
    ...otherProps
  } = props;

  const Component = as;
  const IconOnly = !label && (iconLeft || iconRight);
  const IconLeft = iconLeft;
  const IconRight = iconRight;
  const withIcon = !!iconLeft || !!iconRight;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      onClick={handleClick}
      onBlur={onBlur}
      className={cnButton(
        {
          size,
          view,
          width,
          form,
          disabled,
          'with-icon': withIcon,
          'icon-only': !!IconOnly,
        },
        [className]
      )}
      type={type}
      disabled={disabled}
      tabIndex={tabIndex}
      otherProps={otherProps}
    >
      {IconOnly && <IconOnly size="xs" />}
      {(IconLeft || IconRight) && label ? (
        <Fragment>
          {IconLeft && (
            <IconLeft
              className={cnButton('icon', [wp.ptIconPlus('icon', { 'indent-r': '2xs' })])}
              size="xs"
            />
          )}
          <span className={cnButton('label', [wp.ptIconPlus('block')])}>{label}</span>
          {IconRight && (
            <IconRight
              className={cnButton('icon', [wp.ptIconPlus('icon', { 'indent-l': '2xs' })])}
              size="xs"
            />
          )}
        </Fragment>
      ) : (
        label
      )}
    </Component>
  );
};

export default Button;
