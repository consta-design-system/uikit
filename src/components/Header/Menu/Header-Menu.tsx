import './Header-Menu.css';

import React from 'react';

import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { cnHeader } from '../Header';

export type Item = {
  label?: string;
  href?: string;
  target?: string;
  active?: boolean;
  onClick?: React.EventHandler<React.MouseEvent>;
  children?: never;
};

type Props = {
  items: Item[];
};

export type MenuProps = PropsWithHTMLAttributes<Props, HTMLElement>;

export const HeaderMenu: React.FC<MenuProps> = ({ items, className, ...otherProps }) => {
  return (
    <nav {...otherProps} className={cnHeader('Menu', [className])}>
      <ul className={cnHeader('MenuList')}>
        {items.map(({ label, href, target, active, onClick }, index) => {
          const Component = href ? 'a' : 'div';
          return (
            <li className={cnHeader('MenuItem')} key={cnHeader('MenuItem', { index })}>
              <Component
                className={cnHeader('MenuLink', { active })}
                href={href}
                target={target}
                onClick={onClick}
              >
                {label}
              </Component>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
