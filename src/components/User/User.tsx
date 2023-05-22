import './User.css';

import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import { IconSelect } from '@consta/icons/IconSelect';
import React from 'react';

import { cnMixSpace, Space } from '##/mixs/MixSpace';

import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Avatar } from '../Avatar/Avatar';
import { Button, ButtonPropSize } from '../Button/Button';
import { Text, TextPropSize } from '../Text/Text';

export const userPropSize = ['m', 's', 'l'] as const;
export type UserPropSize = typeof userPropSize[number];
export const userPropSizeDefault: UserPropSize = userPropSize[0];

export const userPropView = ['clear', 'ghost'] as const;
export type UserPropView = typeof userPropView[number];
export const userPropViewDefault: UserPropView = userPropView[0];

export const userPropWidth = ['default', 'full'] as const;
export type UserPropWidth = typeof userPropWidth[number];
export const userPropWidthDefault: UserPropWidth = userPropWidth[0];

export const userPropStatus = ['available', 'remote', 'out'] as const;
export type UserPropStatus = typeof userPropStatus[number];

type Props = {
  avatarUrl?: string;
  name?: string;
  size?: UserPropSize;
  view?: UserPropView;
  width?: UserPropWidth;
  status?: UserPropStatus;
  onlyAvatar?: boolean;
  info?: string;
  children?: never;
} & (
  | {
      withArrow?: boolean;
      iconRight?: never;
      onIconRightClick?: never;
    }
  | {
      withArrow?: never;
      iconRight?: IconComponent;
      onIconRightClick?: (e: React.SyntheticEvent) => void;
    }
);

export const cnUser = cn('User');

const infoSizeMap: Record<UserPropSize, TextPropSize> = {
  s: '2xs',
  m: '2xs',
  l: 'xs',
};

const iconSizeMap: Record<UserPropSize, IconPropSize> = {
  s: 'xs',
  m: 'xs',
  l: 's',
};

const avatarSizeMap: Record<UserPropSize, IconPropSize> = {
  s: 'xs',
  m: 's',
  l: 'm',
};

const buttonSizeMap: Record<UserPropSize, ButtonPropSize> = {
  s: 'xs',
  m: 'xs',
  l: 's',
};

const nameSizeMap: Record<UserPropSize, TextPropSize> = {
  s: 'xs',
  m: 's',
  l: 'm',
};

const nameOffsetMap: Record<UserPropSize, Space> = {
  s: 0,
  m: '3xs',
  l: '2xs',
};

export const User = forwardRefWithAs<Props>((props, ref) => {
  const {
    as = 'div',
    className,
    size = userPropSizeDefault,
    avatarUrl,
    name,
    view = userPropViewDefault,
    width = userPropWidthDefault,
    onlyAvatar: propOnlyAvatar,
    withArrow,
    iconRight,
    onIconRightClick,
    info,
    status,
    ...otherProps
  } = props;
  const Tag = as as string;
  const onlyAvatar = propOnlyAvatar || (!name && !info);
  const IconRight = iconRight;

  return (
    <Tag
      {...otherProps}
      className={cnUser(
        { size, view, width, withArrow, minified: onlyAvatar },
        [className],
      )}
      ref={ref}
    >
      <div className={cnUser('AvatarWrapper', { status })}>
        <Avatar
          size={getByMap(avatarSizeMap, size)}
          url={avatarUrl}
          name={name}
        />
      </div>
      {!onlyAvatar && (name || info) && (
        <div className={cnUser('Block')}>
          {name && (
            <Text
              className={cnUser('Name', [
                cnMixSpace({ mB: nameOffsetMap[size] }),
              ])}
              size={nameSizeMap[size]}
              view="primary"
              lineHeight="2xs"
            >
              {name}
            </Text>
          )}
          {info && size !== 's' && (
            <Text
              className={cnUser('Info')}
              size={getByMap(infoSizeMap, size)}
              view="secondary"
              lineHeight="2xs"
            >
              {info}
            </Text>
          )}
        </div>
      )}
      {withArrow && (
        <IconSelect
          className={cnUser('Icon')}
          size={getByMap(iconSizeMap, size)}
          view="secondary"
        />
      )}
      {IconRight && !onIconRightClick && (
        <IconRight
          className={cnUser('Icon')}
          size={getByMap(iconSizeMap, size)}
          view="secondary"
        />
      )}
      {IconRight && onIconRightClick && (
        <Button
          className={cnUser('IconRightButton')}
          onClick={onIconRightClick}
          iconRight={IconRight}
          onlyIcon
          type="button"
          view="clear"
          size={getByMap(buttonSizeMap, size)}
          form="round"
        />
      )}
    </Tag>
  );
});
