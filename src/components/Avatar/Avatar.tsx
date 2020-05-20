import './Avatar.css';

import React, { useMemo } from 'react';
import random from 'lodash/random';
import { cn } from '../../utils/bem';
import { componentIsFunction } from '../../utils/componentIsFunction';

export type AvatarPropSize = 's' | 'm';
export type AvatarPropForm = 'round' | 'brick' | 'default';

declare type AvatarProps = {
  url?: string;
  name?: string;
  as?: React.ElementType;
  className?: string;
  size?: AvatarPropSize;
  form?: AvatarPropForm;
  innerRef?: React.Ref<HTMLElement>;
};

export type IAvatar<T = {}> = AvatarProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof (AvatarProps & T)> &
    Omit<T, keyof AvatarProps>);

export const cnAvatar = cn('Avatar');

const MAX_COLOR_INDEX = 17;

export const getColorIndexForName = (
  name: string | undefined,
  maxIndex: number | undefined = MAX_COLOR_INDEX
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

export function Avatar<T>(props: IAvatar<T>): React.ReactElement | null {
  const {
    as = 'div',
    className,
    size = 'm',
    form = 'round',
    url,
    name,
    innerRef,
    ...otherProps
  } = props;
  const Component = as;

  const showImage = Boolean(url);
  const initials = useMemo(() => getInitialsForName(name), [name]);
  const colorIndex = useMemo(() => getColorIndexForName(name), [name]);

  return (
    <Component
      {...otherProps}
      style={!showImage ? { '--avatar-color': `var(--avatar-color-${colorIndex})` } : {}}
      className={cnAvatar({ size, form }, [className])}
      {...(componentIsFunction(Component) && { innerRef })}
      ref={innerRef}
    >
      {showImage && <img className={cnAvatar('Image')} src={url} alt={name} />}
      {!showImage && initials}
    </Component>
  );
}
