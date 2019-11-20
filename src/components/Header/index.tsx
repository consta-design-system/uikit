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

const Header: React.FC<HeaderProps> = ({ leftSide, rightSide, className, ...rest }) => {
  const collectItems = arr => {
    return arr.map((item, index) => {
      return (
        <div className={b('module', { indent: item.indent })} key={`module-${index}`}>
          {item.children}
        </div>
      );
    });
  };

  const hasRightSide = rightSide;

  return (
    <header className={b({}, className)} {...rest}>
      <div className={b('left-side')}>{collectItems(leftSide)}</div>

      {hasRightSide ? <div className={b('right-side')}>{collectItems(rightSide)}</div> : ''}
    </header>
  );
};

export default Header;
