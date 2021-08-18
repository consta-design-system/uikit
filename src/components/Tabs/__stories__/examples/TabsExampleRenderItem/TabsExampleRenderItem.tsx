import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge, BadgePropStatus } from '../../../../Badge/Badge';
import { cnTabsTab, Tabs } from '../../../Tabs';

type Item = string;

const items: Item[] = ['Один', 'Два', 'Три'];

export const TabsExampleRenderItem = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        size="m"
        renderItem={({ label, checked, onChange }) => (
          <button type="button" onClick={onChange} className={cnTabsTab({ checked })}>
            <span style={{ marginRight: 'var(--space-m)' }} role="img" aria-label="img">
              {checked ? '🤘' : '✋'}
            </span>
            {label}
          </button>
        )}
      />
    </StoryBookExample>
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
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsBadge}
        getLabel={(item) => item.text}
        size="m"
        renderItem={({ item, onChange, checked }) => (
          <button type="button" onClick={onChange} className={cnTabsTab({ checked })}>
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
    </StoryBookExample>
  );
};
