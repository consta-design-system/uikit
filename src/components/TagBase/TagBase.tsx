import './TagBase.css';

import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import { IconClose } from '@consta/icons/IconClose';
import React from 'react';

import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export const tagBasePropSize = ['m', 'xs', 's', 'l'] as const;
export const tagBasePropSizeDefault = tagBasePropSize[0];
export type TagBasePropSize = typeof tagBasePropSize[number];

export const tagBasePropGroupNumberValue = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const tagBasePropGroupStringValue = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;
export const tagBasePropGroup = [
  ...tagBasePropGroupNumberValue,
  ...tagBasePropGroupStringValue,
];

export type TagBasePropGroup = typeof tagBasePropGroup[number];

export const tagBasePropView = ['stroked', 'filled'] as const;
export const tagBasePropViewDefault = tagBasePropView[0];
export type TagBasePropView = typeof tagBasePropView[number];

export type Props = {
  size?: TagBasePropSize;
  label: string;
  children?: never;
  view?: TagBasePropView;
  group?: TagBasePropGroup;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: IconComponent;
  iconSize?: IconPropSize;
  withAction?: boolean;
  cancelButtonTabIndex?: number;
  disabled?: boolean;
  href?: string;
};

export const cnTagBase = cn('TagBase');

const sizeMap: Record<TagBasePropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const TagBase = forwardRefWithAs<Props>((props, ref) => {
  const {
    size = tagBasePropSizeDefault,
    as = 'div',
    label,
    className,
    group,
    view = tagBasePropViewDefault,
    onCancel,
    icon: Icon,
    iconSize,
    withAction,
    cancelButtonTabIndex,
    disabled,
    href,
    ...otherProps
  } = props;

  const Tag = as as string;
  const withCancel = typeof onCancel === 'function';
  const withIcon = !!Icon;
  const IconCloseSize = getByMap(sizeMap, size);
  const IconSize = getByMap(sizeMap, size, iconSize);
  const tagLinkHref = href && disabled ? undefined : href;

  return (
    <Tag
      {...otherProps}
      className={cnTagBase(
        {
          size,
          view,
          withCancel,
          withIcon,
          disabled,
          withAction: !disabled && withAction,
          group: disabled && group ? 'disabled' : group,
        },
        [className],
      )}
      ref={ref}
      disabled={disabled}
      href={tagLinkHref}
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
            <button
              className={cnTagBase('CancelButton', { disabled })}
              type="button"
              onClick={onCancel}
              tabIndex={cancelButtonTabIndex}
              disabled={disabled}
            >
              <IconClose
                className={cnTagBase('CancelIcon')}
                size={IconCloseSize}
              />
            </button>
          )}
        </>
      ) : (
        label
      )}
    </Tag>
  );
});
