import './Button.css';

import React, { Fragment } from 'react';
import { cn } from '../../utils/bem';
import { IIconProps, PropSize as IconPropSize } from '../Icon';

export const cnButton = cn('button');

export type PropName = string | number;
export type PropId = string | number;
export type PropOnClickProps = {
  e: React.MouseEvent;
  id?: PropId;
  name?: PropName;
};
export type PropOnClick = (object: PropOnClickProps) => void;
export type PropSize = 'xs' | 's' | 'm' | 'l';

export type ButtonProps = {
  id?: PropId;
  name?: PropName;
  size: PropSize;
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
  onlyIcon?: boolean;
  iconSize?: IconPropSize;
  title?: string;
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
  | 'as'
  | 'onlyIcon'
  | 'iconSize'
  | 'title';

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
    onlyIcon,
    iconSize,
    title,
    ...otherProps
  } = props;

  const Component = as;
  const IconOnly = (!label || onlyIcon) && (iconLeft || iconRight);
  const IconLeft = iconLeft;
  const IconRight = iconRight;
  const withIcon = !!iconLeft || !!iconRight;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick({ e, id, name });
    }
  };

  const getIconSizeByButtonSize = (buttonSize: PropSize): IconPropSize => {
    const sizeObj: { xs: IconPropSize; s: IconPropSize; m: IconPropSize; l: IconPropSize } = {
      xs: 'xs',
      s: 'xs',
      m: 's',
      l: 'm',
    };

    return sizeObj[buttonSize];
  };

  const _iconSize = iconSize || getIconSizeByButtonSize(size);
  const _title = title || (!!IconOnly && label);

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
      title={_title}
      {...otherProps}
    >
      {IconOnly && <IconOnly className={cnButton('icon')} size={_iconSize} />}
      {!IconOnly &&
        ((IconLeft || IconRight) && label ? (
          <Fragment>
            {IconLeft && (
              <IconLeft className={cnButton('icon', { position: 'left' })} size={_iconSize} />
            )}
            <span className={cnButton('label')}>{label}</span>
            {IconRight && (
              <IconRight className={cnButton('icon', { position: 'right' })} size={_iconSize} />
            )}
          </Fragment>
        ) : (
          label
        ))}
    </Component>
  );
}
