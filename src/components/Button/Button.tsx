import './Button.css';

import React, { Fragment } from 'react';
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
export type PropOnClick = (object: PropOnClickProps) => void;

export type ButtonProps = {
  id?: PropId;
  name?: PropName;
  size: 'xs' | 's' | 'm' | 'l';
  view: 'clear' | 'ghost' | 'primary' | 'secondary';
  width?: 'default' | 'full';
  form?:
    | 'default'
    | 'brick'
    | 'round'
    | 'brick-round'
    | 'round-brick'
    | 'brick-default'
    | 'default-brick';
  className?: string;
  tabIndex?: number;
  disabled?: boolean;
  onClick?: PropOnClick;
  label?: string;
  iconLeft?: React.FC<IIconProps>;
  iconRight?: React.FC<IIconProps>;
  as?: React.ElementType;
};

declare type excludeHTMLAttributes =
  | 'id'
  | 'name'
  | 'size'
  | 'view'
  | 'width'
  | 'form'
  | 'className'
  | 'tabIndex'
  | 'disabled'
  | 'onClick'
  | 'label'
  | 'iconLeft'
  | 'iconRight'
  | 'as';

export type IButton<T> = ButtonProps &
  (
    | Omit<React.ButtonHTMLAttributes<Element>, excludeHTMLAttributes>
    | Omit<T, excludeHTMLAttributes>);

// При использовании "as" позаботьтесь об интерфейсе прокинутого компонента.
// При вызове кнопки:
// <Button<T>/>

export function Button<T>(props: IButton<T>) {
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
    disabled,
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
      onClick={onClick ? handleClick : undefined}
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
      tabIndex={tabIndex}
      {...otherProps}
    >
      {IconOnly && <IconOnly className={cnButton('icon')} size="xs" />}
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
}
