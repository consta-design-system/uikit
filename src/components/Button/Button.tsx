import './Button.css';

import React, { Fragment } from 'react';
import { cn } from '../../utils/bem';
import { IIcon, IconPropSize } from '../../icons/Icon/Icon';
import { componentIsFunction } from '../../utils/componentIsFunction';
import { Loader } from '../Loader/Loader';

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
  loading?: boolean;
  label?: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  iconLeft?: React.FC<IIcon>;
  iconRight?: React.FC<IIcon>;
  as?: React.ElementType;
  onlyIcon?: boolean;
  iconSize?: IconPropSize;
  title?: string;
  innerRef?: React.Ref<any>;
};

export type IButton<T = {}> = ButtonProps &
  (Omit<React.ButtonHTMLAttributes<Element>, keyof (ButtonProps & T)> & Omit<T, keyof ButtonProps>);

// При использовании "as" позаботьтесь об интерфейсе прокинутого елемента, по умолчанию он button
// При вызове кнопки:
// <Button<T>/>

export const cnButton = cn('Button');

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
    loading,
    tabIndex,
    as = 'button',
    onlyIcon,
    iconSize,
    title,
    innerRef,
    ...otherProps
  } = props;

  const Component = as;
  const IconOnly = (!label || onlyIcon) && (iconLeft || iconRight);
  const IconLeft = iconLeft;
  const IconRight = iconRight;
  const withIcon = !!iconLeft || !!iconRight;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
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
  const _title = title || (!!IconOnly && label) || undefined;

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
          loading,
          withIcon,
          onlyIcon: !!IconOnly,
        },
        [className]
      )}
      tabIndex={tabIndex}
      title={_title}
      ref={innerRef}
      {...(componentIsFunction(Component) && { innerRef })}
      {...otherProps}
    >
      {IconOnly && <IconOnly className={cnButton('Icon')} size={_iconSize} />}
      {!IconOnly &&
        ((IconLeft || IconRight) && label ? (
          <Fragment>
            {IconLeft && (
              <IconLeft className={cnButton('Icon', { position: 'left' })} size={_iconSize} />
            )}
            <span className={cnButton('Label', { withIcon })}>{label}</span>
            {IconRight && (
              <IconRight className={cnButton('Icon', { position: 'right' })} size={_iconSize} />
            )}
          </Fragment>
        ) : (
          <span className={cnButton('Label')}>{label}</span>
        ))}
      {loading && <Loader className={cnButton('Loader')} size="s" currentColor />}
    </Component>
  );
}
