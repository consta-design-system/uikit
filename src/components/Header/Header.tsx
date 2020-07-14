import './Header.css';

import React from 'react';

import { cn } from '../../utils/bem';

export type HeaderProps = {
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  className?: string;
  children?: never;
};

export const cnHeader = cn('Header');

export function Header(props: HeaderProps): React.ReactElement {
  const { leftSide, rightSide, className } = props;
  return (
    <header className={cnHeader(null, [className])}>
      {leftSide && <div className={cnHeader('LeftSide')}>{leftSide}</div>}
      {rightSide && <div className={cnHeader('RightSide')}>{rightSide}</div>}
    </header>
  );
}

export { HeaderLogo } from './Logo/Header-Logo';
export { HeaderSearchBar } from './SearchBar/Header-SearchBar';
export { HeaderMenu } from './Menu/Header-Menu';
export { HeaderModule } from './Module/Header-Module';
export { HeaderLogin } from './Login/Header-Login';
export { HeaderButton } from './Button/Header-Button';
