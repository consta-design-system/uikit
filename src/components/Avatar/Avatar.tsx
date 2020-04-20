import './Avatar.css';

import React from 'react';
import { cn } from '../../utils/bem';

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

export type AvatarPropsAndUserProps<T> = AvatarProps & T;

export type IAvatar<T = {}> = AvatarProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof (AvatarProps & T)> &
    Omit<T, keyof AvatarProps>);

const cnAvatar = cn('Avatar');

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
  return (
    <Component
      className={cnAvatar({ size, form }, [className])}
      ref={innerRef}
      innerRef={innerRef}
      {...otherProps}
    >
      <img className={cnAvatar('Image')} src={url} alt={name} />
    </Component>
  );
}
