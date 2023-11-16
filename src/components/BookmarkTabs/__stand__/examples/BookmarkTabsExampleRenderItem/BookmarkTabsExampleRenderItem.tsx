import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { BookmarkTabs, cnBookmarkTabsTab } from '##/components/BookmarkTabs';
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
          hovered,
          bordered,
          form,
          view,
        }) => (
          <button
            type="button"
            onClick={onClick}
            className={cnBookmarkTabsTab({
              active,
              size,
              form,
              view,
              hovered,
              bordered,
            })}
            style={{
              ['--bookmarks-tab-width' as string]: tabWidth,
            }}
          >
            <Text weight="semibold" view="primary" size="xl" lineHeight="m">
              {item}
            </Text>
          </button>
        )}
      />
    </Example>
  );
};
