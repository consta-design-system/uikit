import './Avatar.css';

import React, { useMemo } from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export const avatarPropSize = ['m', 's', 'xs'] as const;
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
};

export const cnAvatar = cn('Avatar');

const MAX_COLOR_INDEX = 17;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const getColorIndexForName = (
  name: string | undefined,
  maxIndex: number | undefined = MAX_COLOR_INDEX,
) => {
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
    ...otherProps
  } = props;
  const Tag = as as string;
  const showImage = Boolean(url);
  const initials = useMemo(() => getInitialsForName(name), [name]);
  const colorIndex = useMemo(() => getColorIndexForName(name), [name]);

  return (
    <Tag
      {...otherProps}
      style={!showImage ? { '--avatar-color': `var(--avatar-color-${colorIndex})` } : {}}
      className={cnAvatar({ size, form }, [className])}
      ref={ref}
    >
      {showImage && <img className={cnAvatar('Image')} src={url} alt={name} />}
      {!showImage && initials}
    </Tag>
  );
});
