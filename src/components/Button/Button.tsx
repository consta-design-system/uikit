import './Button.css';

import React, { Fragment } from 'react';
import { cn } from '../../utils/bem';
import { IIcon, IconPropSize } from '../Icon';
export type ButtonPropSize = 'xs' | 's' | 'm' | 'l';
export type ButtonPropView = 'clear' | 'ghost' | 'primary' | 'secondary';
export type ButtonPropWidth = 'full' | 'default';
export type ButtonPropForm =
  | 'default'
  | 'brick'
  | 'round'
  | 'brickRound'
  | 'roundBrick'
  | 'brickDefault'
  | 'defaultBrick';

export type ButtonProps = {
  size?: ButtonPropSize;
  view?: ButtonPropView;
  width?: ButtonPropWidth;
  form?: ButtonPropForm;
  className?: string;
  tabIndex?: number;
  disabled?: boolean;
  label?: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  iconLeft?: React.FC<IIcon>;
  iconRight?: React.FC<IIcon>;
  as?: React.ElementType;
  onlyIcon?: boolean;
  iconSize?: IconPropSize;
  title?: string;
};

export type IButton<T = {}> = ButtonProps &
  (Omit<React.ButtonHTMLAttributes<Element>, keyof ButtonProps> | Omit<T, keyof ButtonProps>);

// При использовании "as" позаботьтесь об интерфейсе прокинутого елемента, по умолчанию он button
// При вызове кнопки:
// <Button<T>/>

export const cnButton = cn('button');

export function Button<T = {}>(props: IButton<T>): React.ReactElement | null {
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
      onClick(e);
    }
  };

  const getIconSizeByButtonSize = (buttonSize: ButtonPropSize): IconPropSize => {
    const sizeObj: Record<ButtonPropSize, IconPropSize> = {
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
          withIcon,
          IconOnly: !!IconOnly,
        },
        [className]
      )}
      tabIndex={tabIndex}
      title={_title}
      {...otherProps}
    >
      {IconOnly && <IconOnly className={cnButton('Icon')} size={_iconSize} />}
      {!IconOnly &&
        ((IconLeft || IconRight) && label ? (
          <Fragment>
            {IconLeft && (
              <IconLeft className={cnButton('Icon', { position: 'left' })} size={_iconSize} />
            )}
            <span className={cnButton('Label')}>{label}</span>
            {IconRight && (
              <IconRight className={cnButton('Icon', { position: 'right' })} size={_iconSize} />
            )}
          </Fragment>
        ) : (
          label
        ))}
    </Component>
  );
}
