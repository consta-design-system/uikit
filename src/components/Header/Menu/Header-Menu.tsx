import './Header-Menu.css';

import React from 'react';

import { cnHeader } from '../Header';

export type ItemT = {
  label?: string;
  href?: string;
  target?: string;
  active?: boolean;
  onClick?: React.EventHandler<React.MouseEvent>;
};

export type MenuProps = {
  items: ItemT[];
};

export type IMenu = MenuProps & Omit<React.HTMLAttributes<Element>, keyof MenuProps>;

export const HeaderMenu: React.FC<IMenu> = ({ items, className }) => {
  return (
    <nav className={cnHeader('Menu', [className])}>
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
