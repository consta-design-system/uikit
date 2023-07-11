import { Example } from '@consta/stand';
import React from 'react';

import { BadgePropStatus, BadgePropView } from '##/components/Badge/Badge';
import { BadgeGroup } from '##/components/BadgeGroup/BadgeGroup';

type Item = {
  text: string;
  color: BadgePropStatus;
  form?: BadgePropView;
};

const items: Item[] = [
  {
    text: 'Согласован',
    color: 'success',
  },
  {
    text: 'ожидает',
    color: 'warning',
  },
  {
    text: 'новый',
    form: 'stroked',
    color: 'normal',
  },
  {
    text: 'черновик',
    color: 'system',
  },
  {
    text: 'отказано',
    form: 'stroked',
    color: 'error',
  },
];

export const BadgeGroupExampleItems = () => {
  return (
    <Example>
      <BadgeGroup
        style={{ width: 600 }}
        items={[...items]}
        getItemKey={(item) => item.text}
        getItemLabel={(item) => item.text}
        getItemView={(item) => item.form}
        getItemStatus={(item) => item.color}
      />
    </Example>
  );
};
