import './TagBase.css';

import React from 'react';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { IconClose } from '../../icons/IconClose/IconClose';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { ComponentWithAs, forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export type TagBasePropSize = 'xs' | 's' | 'm' | 'l';
export type TagBasePropGroup =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';

export type Props = {
  size?: TagBasePropSize;
  label: string;
  children?: never;
  view?: 'stroked' | 'filled';
  group?: TagBasePropGroup;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.FC<IconProps>;
  iconSize?: IconPropSize;
};

export const cnTagBase = cn('TagBase');

const sizeMap: Record<TagBasePropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const TagBase: ComponentWithAs<Props> = forwardRefWithAs<Props>((props, ref) => {
  const {
    size = 'm',
    as = 'div',
    label,
    className,
    group,
    view = 'stroked',
    onCancel,
    icon: Icon,
    iconSize,
    ...otherProps
  } = props;

  const Tag = as as string;
  const withCancel = typeof onCancel === 'function';
  const withIcon = !!Icon;
  const IconCloseSize = getSizeByMap(sizeMap, size);
  const IconSize = getSizeByMap(sizeMap, size, iconSize);

  return (
    <Tag
      {...otherProps}
      className={cnTagBase({ size, view, withCancel, withIcon, group }, [className])}
      ref={ref}
    >
      {withCancel || Icon ? (
        <>
          {Icon && (
            <span className={cnTagBase('IconWrapper')}>
              <Icon size={IconSize} className={cnTagBase('Icon')} />
            </span>
          )}
          <span className={cnTagBase('Label')}>{label}</span>
          {withCancel && (
            <button className={cnTagBase('CancelButton')} type="button" onClick={onCancel}>
              <IconClose className={cnTagBase('CancelIcon')} size={IconCloseSize} />
            </button>
          )}
        </>
      ) : (
        label
      )}
    </Tag>
  );
});
