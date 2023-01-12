import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Badge, BadgePropStatus } from '../../../../Badge/Badge';
import { cnTabsTab, Tabs } from '../../../TabsDeprecated';

type Item = string;

const items: Item[] = ['Один', 'Два', 'Три'];

export const TabsExampleRenderItem = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        size="m"
        renderItem={({ label, checked, onChange, size }) => (
          <button
            type="button"
            onClick={onChange}
            className={cnTabsTab({ checked, size })}
          >
            <span
              style={{ marginRight: 'var(--space-m)' }}
              role="img"
              aria-label="img"
            >
              {checked ? '🤘' : '✋'}
            </span>
            {label}
          </button>
        )}
      />
    </Example>
  );
};

type ItemBadge = {
  text: string;
  badgeStatus: BadgePropStatus;
  badgeCount: number;
};

const itemsBadge: ItemBadge[] = [
  {
    text: 'Открыто',
    badgeStatus: 'normal',
    badgeCount: 10,
  },
  {
    text: 'Сделано',
    badgeStatus: 'success',
    badgeCount: 5,
  },
  {
    text: 'Закрыто',
    badgeStatus: 'error',
    badgeCount: 2,
  },
];

export const TabsExampleRenderItemBadge = () => {
  const [value, setValue] = useState<ItemBadge | null>(itemsBadge[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsBadge}
        getLabel={(item) => item.text}
        size="m"
        renderItem={({ item, onChange, checked, size }) => (
          <button
            type="button"
            onClick={onChange}
            className={cnTabsTab({ checked, size })}
          >
            {item.text}
            <Badge
              status={item.badgeStatus}
              label={item.badgeCount.toString()}
              size="s"
              style={{ marginLeft: 'var(--space-s)' }}
            />
          </button>
        )}
      />
    </Example>
  );
};
