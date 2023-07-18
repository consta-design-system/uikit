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

const getItemLabel = (item: Item) => item.text;
const getItemView = (item: Item) => item.form;
const getItemStatus = (item: Item) => item.color;

export const BadgeGroupExampleItems = () => {
  return (
    <Example>
      <BadgeGroup
        style={{ width: 600 }}
        items={items}
        getItemKey={getItemLabel}
        getItemLabel={getItemLabel}
        getItemView={getItemView}
        getItemStatus={getItemStatus}
      />
    </Example>
  );
};
