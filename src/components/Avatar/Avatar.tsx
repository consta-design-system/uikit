import './Avatar.css';

import React, { useMemo } from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import {
  getColorIndexForName,
  getInitialsForName,
  MAX_COLOR_INDEX,
} from './helpers';

export const avatarPropSize = ['m', 's', 'xs', 'l'] as const;
export type AvatarPropSize = typeof avatarPropSize[number];
export const avatarPropSizeDefault: AvatarPropSize = avatarPropSize[0];

export const avatarPropForm = ['round', 'brick', 'default'] as const;
export type AvatarPropForm = typeof avatarPropForm[number];
export const avatarPropFormDefault: AvatarPropForm = avatarPropForm[0];

type Props = {
  url?: string;
  name?: string;
  size?: AvatarPropSize;
  form?: AvatarPropForm;
  children?: never;
  monochrome?: boolean;
};

export const cnAvatar = cn('Avatar');

export const Avatar = forwardRefWithAs<Props>((props, ref) => {
  const {
    as = 'div',
    className,
    size = avatarPropSizeDefault,
    form = avatarPropFormDefault,
    url,
    name,
    monochrome,
    style,
    ...otherProps
  } = props;
  const Tag = as as string;
  const initials = useMemo(() => getInitialsForName(name), [name]);
  const colorIndex = useMemo(
    () => getColorIndexForName(name, MAX_COLOR_INDEX, monochrome),
    [name, monochrome],
  );

  return (
    <Tag
      {...otherProps}
      style={
        !url
          ? { ...style, '--avatar-color': `var(--avatar-color-${colorIndex})` }
          : style
      }
      className={cnAvatar(
        { size, form, monochrome: url ? monochrome : undefined },
        [className],
      )}
      ref={ref}
    >
      {url && <img className={cnAvatar('Image')} src={url} alt={name} />}
      {!url && initials}
    </Tag>
  );
});
