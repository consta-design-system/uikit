import './Avatar.css';

import React, { useRef, useEffect, useMemo } from 'react';
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
  innerRef?: React.Ref<any>;
};

export type IAvatar<T = {}> = AvatarProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof (AvatarProps & T)> &
    Omit<T, keyof AvatarProps>);

const cnAvatar = cn('Avatar');

const colors = [
  '#F9A825',
  '#F56B00',
  '#C62828',
  '#C2185B',
  '#E92064',
  '#911FA2',
  '#9010D1',
  '#7448DD',
  '#3E3ACB',
  '#2044D5',
  '#016BDC',
  '#2196F3',
  '#00BCD4',
  '#0088A3',
  '#008F7C',
  '#00A352',
  '#1ABC1A',
  '#6FB80A',
];

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const getBackgroundColor = (name: string | undefined) => {
  let index = 0;

  if (name) {
    index =
      name
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((acc, code) => acc + code, 0) % colors.length;
  } else {
    index = getRandom(0, colors.length);
  }

  return colors[index];
};

const getInitials = (name: string | undefined) => {
  if (!name) {
    return '';
  }

  const words = name.split(' ');
  const firstLetter = words[0] ? words[0][0] : '';
  const secondLatter = words[1] ? words[1][0] : '';

  return `${firstLetter.toUpperCase()} ${secondLatter.toUpperCase()}`;
};

function combineRefs(refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

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
  const backgroundColor = useMemo(() => getBackgroundColor(name), [name]);

  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    localRef.current && localRef.current.style.setProperty('--backgroundColor', backgroundColor);
  }, [backgroundColor]);

  return (
    <Component
      {...otherProps}
      className={cnAvatar({ size, form }, [className])}
      {...(componentIsFunction(Component) && { ref })}
      ref={combineRefs([localRef, ref])}
    >
      {showImage && <img className={cnAvatar('Image')} src={url} alt={name} />}
      {!showImage && <span className={cnAvatar('Initials')}>{initials}</span>}
    </Component>
  );
}
