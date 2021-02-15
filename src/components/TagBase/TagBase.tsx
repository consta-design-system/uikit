import './TagBase.css';

import React from 'react';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { IconClose } from '../../icons/IconClose/IconClose';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Avatar } from '../Avatar/Avatar';

export const tagBasePropSize = ['m', 'xs', 's', 'l'] as const;
export const tagBasePropSizeDefault = tagBasePropSize[0];
export type TagBasePropSize = typeof tagBasePropSize[number];

export const tagBasePropGroupNumberValue = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const tagBasePropGroupStringValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
export const tagBasePropGroup = [...tagBasePropGroupNumberValue, ...tagBasePropGroupStringValue];

export type TagBasePropGroup = typeof tagBasePropGroup[number];

export const tagBasePropView = ['stroked', 'filled'] as const;
export const tagBasePropViewDefault = tagBasePropView[0];
export type TagBasePropView = typeof tagBasePropView[number];

export type Props = {
  size?: TagBasePropSize;
  label: string;
  subLabel?: string;
  children?: never;
  view?: TagBasePropView;
  group?: TagBasePropGroup;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.FC<IconProps>;
  iconSize?: IconPropSize;
  withAction?: boolean;
  isUserSelect?: boolean;
  url?: string;
};

export const cnTagBase = cn('TagBase');

const sizeMap: Record<TagBasePropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

const avatarSizeMap: Record<TagBasePropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
};

export const TagBase = forwardRefWithAs<Props>((props, ref) => {
  const {
    size = tagBasePropSizeDefault,
    as = 'div',
    label,
    subLabel,
    className,
    group,
    view = tagBasePropViewDefault,
    onCancel,
    icon: Icon,
    iconSize,
    withAction,
    isUserSelect,
    url,
    ...otherProps
  } = props;

  const Tag = as as string;
  const withCancel = typeof onCancel === 'function';
  const withIcon = !!Icon;
  const withUser = !!isUserSelect;
  const IconCloseSize = getSizeByMap(sizeMap, size);
  const IconSize = getSizeByMap(sizeMap, size, iconSize);
  const AvatarSize = getSizeByMap(avatarSizeMap, size);

  return (
    <Tag
      {...otherProps}
      className={cnTagBase(
        {
          size,
          view,
          withCancel,
          withIcon,
          group,
          withAction,
          withUser,
        },
        [className],
      )}
      ref={ref}
    >
      {withCancel || Icon || withUser ? (
        <>
          {Icon && (
            <span className={cnTagBase('IconWrapper')}>
              <Icon size={IconSize} className={cnTagBase('Icon')} />
            </span>
          )}
          {withUser ? (
            <>
              <span className={cnTagBase('IconWrapper')}>
                <Avatar size={AvatarSize} url={url} name={label} />
              </span>
              <div className={cnTagBase('UserLabelsWrapper')}>
                <div className={cnTagBase('UserLabel')}>{label}</div>
                {subLabel && size !== 's' && (
                  <div className={cnTagBase('SubUserLabel')}>{subLabel}</div>
                )}
              </div>
            </>
          ) : (
            <span className={cnTagBase('Label')}>{label}</span>
          )}
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
