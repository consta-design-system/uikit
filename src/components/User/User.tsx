import './User.css';

import React from 'react';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { TagBasePropSize } from '../TagBase/TagBase';
import { Text, TextPropSize } from '../Text/Text';

export const userPropSize = ['l', 'm', 's'] as const;
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
      onIconClick?: never;
    }
  | {
      withArrow?: never;
      iconRight?: React.FC<IconProps>;
      onIconClick?: (e: React.SyntheticEvent) => void;
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

const avatarSizeMap: Record<TagBasePropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
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
    onIconClick,
    info,
    status,
    ...otherProps
  } = props;
  const Tag = as as string;
  const onlyAvatar = propOnlyAvatar || (!name && !info);
  const infoSize = getSizeByMap(infoSizeMap, size);
  const iconSize = getSizeByMap(iconSizeMap, size);
  const avatarSize = getSizeByMap(avatarSizeMap, size);
  const IconRight = iconRight;

  return (
    <Tag
      {...otherProps}
      className={cnUser({ size, view, width, withArrow, minified: onlyAvatar }, [className])}
      ref={ref}
    >
      <div className={cnUser('AvatarWrapper', { status })}>
        <Avatar
          className={cnUser('Avatar', { status })}
          size={avatarSize}
          url={avatarUrl}
          name={name}
        />
      </div>
      {!onlyAvatar && (name || info) && (
        <div className={cnUser('Block')}>
          {name && (
            <Text className={cnUser('Name')} size={size} view="primary" lineHeight="2xs">
              {name}
            </Text>
          )}
          {info && size !== 's' && (
            <Text className={cnUser('Info')} size={infoSize} view="secondary" lineHeight="2xs">
              {info}
            </Text>
          )}
        </div>
      )}
      {withArrow && <IconSelect className={cnUser('Arrow')} size={iconSize} view="secondary" />}
      {IconRight && (
        <Button
          className={cnUser('Icon')}
          onClick={onIconClick}
          iconRight={IconRight}
          onlyIcon
          view="clear"
          size="s"
          iconSize={iconSize}
        />
      )}
    </Tag>
  );
});
