import './Button.css';

import React, { Fragment, FocusEventHandler } from 'react';
import { cn } from '../../utils/bem';
import { IIconProps } from '../Icon';
import * as wp from '../../utils/whitepaper/whitepaper';

export const cnButton = cn('button');

export type PropName = string | number;
export type PropId = string | number;
export type PropOnClickProps = {
  e: React.MouseEvent;
  id?: PropId;
  name?: PropName;
};

export interface IButton {
  id?: PropId;
  name?: PropName;
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
  children?: React.ReactNode;
  className?: string;
  tabIndex?: number;
  disabled?: boolean;
  onClick?: (object: PropOnClickProps) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
  label: string;
  type?: 'submit' | 'reset' | 'button';
  iconLeft?: React.FC<IIconProps>;
  iconRight?: React.FC<IIconProps>;
  as?: React.ElementType;
}

//TODO: <IButton | any> - в дальнейшем подумать как избежать Any

export const Button: React.FC<IButton | any> = (props) => {
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
    id,
    name,
    ...otherProps
  } = props;

  const Component = as;
  const IconOnly = !label && (iconLeft || iconRight);
  const IconLeft = iconLeft;
  const IconRight = iconRight;
  const withIcon = !!iconLeft || !!iconRight;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick({ e, id, name });
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
      name={name}
      id={id}
      {...otherProps}
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
