import './Avatar.css';

import React, { useMemo } from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

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

const MAX_COLOR_INDEX = 17;

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getColorIndexForName = (
  name: string | undefined,
  maxIndex: number = MAX_COLOR_INDEX,
  monochrome?: boolean,
) => {
  if (monochrome) {
    return MAX_COLOR_INDEX + 1;
  }

  let index = 0;

  if (name) {
    index =
      name
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((acc, code) => acc + code, 0) % maxIndex;
  } else {
    index = getRandomInt(maxIndex);
  }

  return index;
};

export const getInitialsForName = (name: string | undefined) => {
  if (!name) {
    return '';
  }

  const words = name.split(' ');
  const firstLetter = words[0] ? words[0][0] : '';
  const secondLatter = words[1] ? words[1][0] : '';

  return `${firstLetter.toUpperCase()}${secondLatter.toUpperCase()}`;
};

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
