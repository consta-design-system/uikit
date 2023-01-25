import { Example } from '@consta/stand';
import React from 'react';

import { List, ListBox } from '##/components/ListCanary';

const items: string[] = ['Первый', 'Второй', 'Третий'];

const getItemLabel = (item: string) => item;

export const ListExampleListBox = () => {
  return (
    <Example>
      <ListBox form="round" shadow border>
        <List
          getItemLabel={getItemLabel}
          items={items}
          onItemClick={(item) => alert(item)}
        />
      </ListBox>
    </Example>
  );
};
