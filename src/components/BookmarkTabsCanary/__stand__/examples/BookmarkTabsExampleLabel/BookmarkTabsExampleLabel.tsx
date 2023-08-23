import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs } from '##/components/BookmarkTabsCanary/BookmarkTabs';

const items: string[] = ['Один', 'Два', 'Три'];

const getItemLabel = (label: string) => label;

export const BookmarkTabsExampleLabel = () => {
  const [value, setValue] = useState<string | null>(items[0]);

  return (
    <Example>
      <BookmarkTabs
        style={{
          width: 600,
        }}
        value={value}
        onChange={setValue}
        getItemFixed={() => false}
        items={items}
        getItemKey={getItemLabel}
        getItemLabel={getItemLabel}
      />
    </Example>
  );
};
