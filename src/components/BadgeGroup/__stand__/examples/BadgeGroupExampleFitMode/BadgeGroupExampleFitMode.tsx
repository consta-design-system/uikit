import { Example } from '@consta/stand';
import React from 'react';

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
    status: 'alert',
  },
];

export const BadgeGroupExampleFitModeReduction = () => {
  return (
    <Example>
      <BadgeGroup style={{ width: 400 }} items={items} fitMode="reduction" />
    </Example>
  );
};

export const BadgeGroupExampleFitModeWrap = () => {
  return (
    <Example>
      <BadgeGroup style={{ width: 400 }} items={items} fitMode="wrap" />
    </Example>
  );
};
