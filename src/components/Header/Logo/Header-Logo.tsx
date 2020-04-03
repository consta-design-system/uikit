import './Header-Logo.css';

import React from 'react';
import { cnHeader } from '../Header';

type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
};

export type IHeaderLogo<T> = HeaderProps &
  (Omit<React.HTMLAttributes<Element>, keyof HeaderProps> | Omit<T, keyof HeaderProps>);

export function HeaderLogo<T>(props: IHeaderLogo<T>): React.ReactElement | null {
  const { children, as = 'div', className, ...otherProps } = props;
  const Component = as;
  return (
    <Component className={cnHeader('logo', [className])} {...otherProps}>
      {children}
    </Component>
  );
}
