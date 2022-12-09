import './HeaderMenuExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Header } from '../../../Header';
import { HeaderMenu } from '../../../Menu/HeaderMenu';
import { HeaderModule } from '../../../Module/HeaderModule';

const cnExample = cn('HeaderMenuExample');

export function HeaderMenuExample() {
  const menuItems = [
    {
      label: 'Проекты',
      href: '#projects',
      active: true,
    },
    {
      label: 'Задачи',
      href: '#tasks',
    },
    {
      label: 'Еще',
      href: '#additional',
    },
  ];

  return (
    <Example col={1}>
      <Header
        className={cnExample()}
        leftSide={
          <HeaderModule indent="l">
            <HeaderMenu items={menuItems} />
          </HeaderModule>
        }
      />
    </Example>
  );
}
