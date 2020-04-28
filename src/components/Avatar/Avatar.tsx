import './Avatar.css';

import React, { useRef, useEffect, useMemo } from 'react';
import random from 'lodash/random';
import { cn } from '../../utils/bem';
import { componentIsFunction } from '../../utils/componentIsFunction';
import { useForkRef } from '../../utils/useForkRef';

export type AvatarPropSize = 's' | 'm';
export type AvatarPropForm = 'round' | 'brick' | 'default';

declare type AvatarProps = {
  url?: string;
  name?: string;
  as?: React.ElementType;
  className?: string;
  size?: AvatarPropSize;
  form?: AvatarPropForm;
  innerRef?: React.Ref<any>;
};

export type IAvatar<T = {}> = AvatarProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof (AvatarProps & T)> &
    Omit<T, keyof AvatarProps>);

const cnAvatar = cn('Avatar');

const getColorIndexForName = (name: string | undefined) => {
  const LAST_COLOR_INDEX = 17;
  let index = 0;

  if (name) {
    index =
      name
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((acc, code) => acc + code, 0) % LAST_COLOR_INDEX;
  } else {
    index = random(0, LAST_COLOR_INDEX);
  }

  return index;
};

const getInitials = (name: string | undefined) => {
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
    innerRef: ref,
    ...otherProps
  } = props;
  const Component = as;

  const showImage = Boolean(url);
  const initials = useMemo(() => getInitials(name), [name]);
  const colorIndex = useMemo(() => getColorIndexForName(name), [name]);

  const localRef = useRef<HTMLElement>(null);
  const handleRef = useForkRef([localRef, ref]);

  useEffect(() => {
    localRef.current &&
      localRef.current.style.setProperty('--avatar-color', `var(--avatar-color-${colorIndex})`);
  }, [colorIndex]);

  return (
    <Component
      {...otherProps}
      className={cnAvatar({ size, form }, [className])}
      {...(componentIsFunction(Component) && { innerRef: handleRef })}
      ref={handleRef}
    >
      {showImage && <img className={cnAvatar('Image')} src={url} alt={name} />}
      {!showImage && initials}
    </Component>
  );
}
