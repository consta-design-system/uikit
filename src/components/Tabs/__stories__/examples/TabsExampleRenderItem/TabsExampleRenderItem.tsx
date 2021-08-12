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
        renderItem={({ className, ref, label, onChange, key }) => (
          <button
            key={key}
            type="button"
            onClick={onChange}
            ref={ref}
            className={cnTabsTab(null, [className])}
          >
            <span style={{ marginRight: 4 }} role="img" aria-label="img">
              🤘
            </span>
            {label}
          </button>
        )}
      />
    </StoryBookExample>
  );
};

type itemBadge = {
  text: string;
  badgeStatus: BadgePropStatus;
  badgeCount: number;
};

const itemsBadge: itemBadge[] = [
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
  const [value, setValue] = useState<itemBadge | null>(itemsBadge[0]);
  return (
    <Tabs
      value={value}
      onChange={({ value }) => setValue(value)}
      items={itemsBadge}
      getLabel={(item) => item.text}
      size="m"
      renderItem={({ item, className, ref, onChange, key }) => (
        <button
          key={key}
          type="button"
          onClick={onChange}
          ref={ref}
          className={cnTabsTab(null, [className])}
        >
          <div style={{ marginRight: 'var(--space-2xs)' }}>{item.text}</div>
          <Badge status={item.badgeStatus} label={item.badgeCount.toString()} size="s" />
        </button>
      )}
    />
  );
};
