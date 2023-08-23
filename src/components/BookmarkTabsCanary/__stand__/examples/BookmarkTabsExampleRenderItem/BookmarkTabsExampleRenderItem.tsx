import { Example } from '@consta/stand';
import React, { useState } from 'react';

import {
  BookmarkTabs,
  cnBookmarkTabsTab,
} from '##/components/BookmarkTabsCanary';
import { Text } from '##/components/Text';

type Item = string;

const items: Item[] = ['Один', 'Два', 'Три'];

export const BookmarkTabsExampleRenderItem = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example>
      <BookmarkTabs
        style={{
          width: 600,
        }}
        items={items}
        value={value}
        getItemKey={(item) => item}
        onChange={setValue}
        getItemFixed={() => false}
        renderItem={({
          item,
          onClick,
          active,
          tabWidth,
          size,
          form,
          view,
          controlRef,
        }) => (
          <button
            type="button"
            onClick={onClick}
            ref={controlRef as React.RefObject<HTMLButtonElement>}
            className={cnBookmarkTabsTab({ active, size, form, view })}
            style={{
              ['--bookmarks-tab-width' as string]: tabWidth,
            }}
          >
            <Text weight="semibold" size="xl">
              {item}
            </Text>
          </button>
        )}
      />
    </Example>
  );
};
