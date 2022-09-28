import './HeaderMenu.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';

export const cnHeaderMenu = cn('HeaderMenu');

export type Item = {
  label?: string;
  href?: string;
  target?: string;
  active?: boolean;
  onClick?: React.EventHandler<React.MouseEvent>;
  children?: never;
};

type MenuProps = PropsWithJsxAttributes<
  {
    items: Item[];
  },
  'nav'
>;

export const HeaderMenu: React.FC<MenuProps> = ({
  items,
  className,
  ...otherProps
}) => {
  return (
    <nav {...otherProps} className={cnHeaderMenu(null, [className])}>
      <ul className={cnHeaderMenu('List')}>
        {items.map(({ label, href, target, active, onClick }, index) => {
          const Tag = href ? 'a' : 'div';
          return (
            <li
              className={cnHeaderMenu('Item')}
              key={cnHeaderMenu('Item', { index })}
            >
              <Tag
                className={cnHeaderMenu('Link', { active })}
                href={href}
                target={target}
                onClick={onClick}
              >
                {label}
              </Tag>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
