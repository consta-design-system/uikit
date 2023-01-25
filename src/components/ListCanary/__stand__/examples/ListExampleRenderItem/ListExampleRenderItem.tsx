import './ListExampleRenderItem.css';

import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { List } from '##/components/ListCanary';
import { cn } from '##/utils/bem';

const cnListExampleRenderItem = cn('ListExampleRenderItem');

type Item = {
  label: string;
  status?: 'repairs' | 'serviceable';
};

const items: Item[] = [
  {
    label: 'Принтер',
    status: 'repairs',
  },
  {
    label: 'Монитор',
    status: 'serviceable',
  },
  {
    label: 'Ноутбук',
    status: 'serviceable',
  },
  {
    label: 'Стол',
  },
];

const mapLabel = {
  repairs: 'На ремонте',
  serviceable: 'Исправен',
} as const;

const mapStatus = {
  repairs: 'error',
  serviceable: 'success',
} as const;

export const ListExampleRenderItem = () => {
  return (
    <Example>
      <List
        items={items}
        renderItem={(item) => (
          <div className={cnListExampleRenderItem('Item')}>
            {item.label}
            {item.status && (
              <Badge
                className={cnListExampleRenderItem('Badge')}
                as="span"
                size="s"
                label={mapLabel[item.status]}
                status={mapStatus[item.status]}
              />
            )}
          </div>
        )}
      />
    </Example>
  );
};
