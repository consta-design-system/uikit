import { Example } from '@consta/stand';
import React from 'react';

import { badgePropForm } from '##/components/Badge/Badge';
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

export const BadgeGroupExampleForm = () => {
  return (
    <Example
      items={[...badgePropForm]}
      getItemNode={(form) => <BadgeGroup items={items} form={form} />}
      getItemDescription={(form) => `form=${form}`}
    />
  );
};
