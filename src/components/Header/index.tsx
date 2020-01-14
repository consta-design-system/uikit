import React from 'react';
import bem from '../../utils/bem';

import './styles.css';

const b = bem('header');

export type ModuleT = {
  indent?: 's' | 'm' | 'l';
  children?: React.ReactNode;
};

export type LeftSideT = {
  items: ModuleT[];
};

export type RightSideT = {
  items: ModuleT[];
};

type HeaderProps = {
  leftSide: LeftSideT[];
  rightSide?: RightSideT[];
  className?: string;
};

const collectItems = arr => {
  return arr.map((item, index) => {
    return (
      <div className={b('module', { indent: item.indent })} key={`module-${index}`}>
        {item.children}
      </div>
    );
  });
};

const Header: React.FC<HeaderProps> = ({ leftSide, rightSide, className, ...rest }) => {
  return (
    <header className={b({}, className)} {...rest}>
      <div className={b('left-side')}>{collectItems(leftSide)}</div>

      {rightSide && <div className={b('right-side')}>{collectItems(rightSide)}</div>}
    </header>
  );
};

export { Logo } from './modules/Logo';
export { SearchBar } from './modules/SearchBar';
export { Menu } from './modules/Menu';
export { Login } from './modules/Login';
export { IconButton } from './modules/IconButton';

export default Header;
