import { Example } from '@consta/stand';
import React from 'react';

import {
  BadgeGroup,
  BadgeGroupDefaultItem,
} from '##/components/BadgeGroup/BadgeGroup';

const badges: BadgeGroupDefaultItem[] = [
  {
    key: '1',
    label: 'Согласован',
    status: 'success',
  },
  {
    key: '2',
    label: 'ожидает',
    status: 'warning',
  },
  {
    key: '3',
    label: 'новый',
    view: 'stroked',
    status: 'normal',
  },
  {
    key: '4',
    label: 'черновик',
    status: 'system',
  },
  {
    key: '5',
    label: 'отказано',
    view: 'stroked',
    status: 'error',
  },
];

export const BadgeGroupExampleBasic = () => {
  return (
    <Example>
      <BadgeGroup style={{ width: 600 }} items={badges} />
    </Example>
  );
};
