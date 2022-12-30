import './ListExampleRenderItem.css';

import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { cnMixList, List } from '##/components/ListCanary';
import { cn } from '##/utils/bem';

const cnListExampleRenderItem = cn('ListExampleRenderItem');

type Item = {
  label: string;
  id: number;
  status?: 'repairs' | 'serviceable';
};

const items: Item[] = [
  {
    label: 'Принтер',
    id: 1,
    status: 'repairs',
  },
  {
    label: 'Монитор',
    id: 2,
    status: 'serviceable',
  },
  {
    label: 'Ноутбук',
    id: 3,
    status: 'serviceable',
  },
  {
    label: 'Стол',
    id: 4,
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
        className={cnListExampleRenderItem(null, [cnMixList({})])}
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
