import './Avatar.css';

import React from 'react';
import { cn } from '../../utils/bem';

declare type AvatarProps = {
  url?: string;
  name?: string;
  as?: React.ElementType;
  className?: string;
  size?: 's' | 'm';
  form?: 'round' | 'brick' | 'default';
};

export type IAvatar<T = {}> = AvatarProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof AvatarProps> | Omit<T, keyof AvatarProps>);

const cnAvatar = cn('avatar1');

export function Avatar<T>(props: IAvatar<T>): React.ReactElement | null {
  const { as = 'div', className, size = 'm', form = 'round', url, name, ...otherProps } = props;
  const Component = as;
  return (
    <Component className={cnAvatar({ size, form }, [className])} {...otherProps}>
      <img className={cnAvatar('image')} src={url} alt={name} />
    </Component>
  );
}
