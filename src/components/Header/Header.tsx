import './Header.css';

import React from 'react';
import { cn } from '../../utils/bem';

export type IHeader = {
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  className?: string;
};

export const cnHeader = cn('header');

export function Header(props: IHeader): React.ReactElement {
  const { leftSide, rightSide, className } = props;
  return (
    <header className={cnHeader(null, [className])}>
      {leftSide && <div className={cnHeader('left-side')}>{leftSide}</div>}
      {rightSide && <div className={cnHeader('right-side')}>{rightSide}</div>}
    </header>
  );
}

export { HeaderLogo } from './Logo/Header-Logo';
export { HeaderSearchBar } from './SearchBar/Header-SearchBar';
export { HeaderMenu } from './Menu/Header-Menu';
export { HeaderLogin } from './Login/Header-Login';
export { HeaderButton } from './Button/Header-Button';
