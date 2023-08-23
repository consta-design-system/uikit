import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs } from '##/components/BookmarkTabsCanary/BookmarkTabs';

const items: string[] = ['Один', 'Два', 'Три'];

const getItemLabel = (label: string) => label;

export const BookmarkTabsExampleAs = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example>
      <BookmarkTabs
        style={{
          width: 600,
        }}
        value={value}
        onChange={setValue}
        items={items}
        getItemKey={(item) => item}
        getItemAs={() => 'a'}
        getItemFixed={() => false}
        getItemAttributes={(item) => ({ href: item })}
        getItemLabel={getItemLabel}
      />
    </Example>
  );
};
