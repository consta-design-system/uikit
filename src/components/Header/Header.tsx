import './Header.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { PropsWithJsxAttributes } from '../../utils/types/PropsWithJsxAttributes';

export type HeaderProps = PropsWithJsxAttributes<
  {
    leftSide?: React.ReactNode;
    rightSide?: React.ReactNode;
    children?: never;
  },
  'header'
>;

export const cnHeader = cn('Header');

export const Header = (props: HeaderProps): React.ReactElement => {
  const { leftSide, rightSide, className, ...otherProps } = props;
  return (
    <header {...otherProps} className={cnHeader(null, [className])}>
      {leftSide && <div className={cnHeader('LeftSide')}>{leftSide}</div>}
      {rightSide && <div className={cnHeader('RightSide')}>{rightSide}</div>}
    </header>
  );
};

export { HeaderLogo } from './Logo/HeaderLogo';
export { HeaderSearchBar } from './SearchBar/HeaderSearchBar';
export { HeaderMenu } from './Menu/HeaderMenu';
export { HeaderModule } from './Module/HeaderModule';
export { HeaderLogin } from './Login/HeaderLogin';
export { HeaderButton } from './Button/HeaderButton';
