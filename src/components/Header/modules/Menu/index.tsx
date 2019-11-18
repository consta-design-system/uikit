import React from 'react';
import bem from '../../../../utils/bem';

import './styles.css';

const b = bem('menu');

export type ItemT<T> = {
  name: string;
  link: string;
  active?: boolean;
};

type MenuProps<T> = {
  items: ItemT<T>[];
  className;
};

const Menu: React.FC<MenuProps> = ({ items, className, ...restProps }) => {
  return (
    <nav className={b({}, className)} {...restProps}>
      <ul className={b('list', {})}>
        {items.map((item, index) => {
          return (
            <li className={b('item', {})} key={`menu-item-${index}`}>
              <a className={b('link', { active: item.active })} href={item.link}>
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
