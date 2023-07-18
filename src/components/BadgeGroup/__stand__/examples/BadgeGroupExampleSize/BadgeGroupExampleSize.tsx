import { Example } from '@consta/stand';
import React from 'react';

import { BadgePropSize } from '##/components/Badge/Badge';
import { BadgeGroup, BadgeGroupDefaultItem } from '##/components/BadgeGroup';

const items: BadgeGroupDefaultItem[] = [
  {
    key: 1,
    label: 'Согласован',
    status: 'success',
  },
  {
    key: 2,
    label: 'ожидает',
    status: 'warning',
  },
  {
    key: 3,
    label: 'новый',
    view: 'stroked',
    status: 'normal',
  },
  {
    key: 4,
    label: 'черновик',
    status: 'system',
  },
  {
    key: 5,
    label: 'отказано',
    view: 'stroked',
    status: 'error',
  },
];

const sizes: BadgePropSize[] = ['l', 'm', 's', 'xs'];

export const BadgeGroupExampleSize = () => {
  return (
    <Example
      col={1}
      items={sizes}
      getItemNode={(size) => <BadgeGroup items={items} size={size} />}
      getItemDescription={(size) => `size=${size}`}
    />
  );
};
