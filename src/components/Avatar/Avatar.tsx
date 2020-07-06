import './Avatar.css';

import React, { useMemo } from 'react';
import random from 'lodash/random';

import { cn } from '../../utils/bem';
import { ComponentWithAs, forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export type AvatarPropSize = 's' | 'm';
export type AvatarPropForm = 'round' | 'brick' | 'default';

type Props = {
  url?: string;
  name?: string;
  size?: AvatarPropSize;
  form?: AvatarPropForm;
  children?: never;
};

export const cnAvatar = cn('Avatar');

const MAX_COLOR_INDEX = 17;

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
    index = random(0, maxIndex);
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

export const Avatar: ComponentWithAs<Props> = forwardRefWithAs<Props>((props, ref) => {
  const { as = 'div', className, size = 'm', form = 'round', url, name, ...otherProps } = props;
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
