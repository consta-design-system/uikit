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

export type IMenu = {
  items: ItemT[];
  className?;
};

export const HeaderMenu: React.FC<IMenu> = ({ items, className }) => {
  return (
    <nav className={cnHeader('menu', [className])}>
      <ul className={cnHeader('menu-list')}>
        {items.map(({ label, href, target, active, onClick }, index) => {
          const Component = href ? 'a' : 'div';
          return (
            <li className={cnHeader('menu-item')} key={cnHeader('menu-item', { index })}>
              <Component
                className={cnHeader('menu-link', { active })}
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
