import './Button.css';

import React from 'react';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { ComponentWithAs, forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
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

type Props = {
  size?: ButtonPropSize;
  view?: ButtonPropView;
  width?: ButtonPropWidth;
  form?: ButtonPropForm;
  tabIndex?: number;
  disabled?: boolean;
  loading?: boolean;
  label?: string | number;
  onClick?: React.EventHandler<React.MouseEvent>;
  iconLeft?: React.FC<IconProps>;
  iconRight?: React.FC<IconProps>;
  onlyIcon?: boolean;
  iconSize?: IconPropSize;
  title?: string;
  children?: never;
};

export const cnButton = cn('Button');

const sizeMap: Record<ButtonPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
};

export const Button: ComponentWithAs<Props, 'button'> = forwardRefWithAs<Props>((props, ref) => {
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
    iconSize: iconSizeProp,
    ...otherProps
  } = props;

  const Tag = as as string;
  const IconOnly = (!label || onlyIcon) && (iconLeft || iconRight);
  const IconLeft = iconLeft;
  const IconRight = iconRight;
  const withIcon = !!iconLeft || !!iconRight;
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const iconSize = getSizeByMap(sizeMap, size, iconSizeProp);
  const title = props.title || (!!IconOnly && label) || undefined;

  return (
    <Tag
      {...otherProps}
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
        [cnMixFocus(), className],
      )}
      tabIndex={tabIndex}
      title={title}
      ref={ref}
      {...(Tag === 'button' ? { disabled: disabled || loading } : {})}
    >
      {IconOnly && <IconOnly className={cnButton('Icon')} size={iconSize} />}
      {!IconOnly &&
        ((IconLeft || IconRight) && label ? (
          <>
            {IconLeft && (
              <IconLeft className={cnButton('Icon', { position: 'left' })} size={iconSize} />
            )}
            <span className={cnButton('Label')}>{label}</span>
            {IconRight && (
              <IconRight className={cnButton('Icon', { position: 'right' })} size={iconSize} />
            )}
          </>
        ) : (
          label
        ))}
      {loading && <Loader className={cnButton('Loader')} size="s" />}
    </Tag>
  );
});
