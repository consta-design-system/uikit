import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { List } from '##/components/ListCanary';

const items: string[] = ['Первый', 'Второй', 'Третий'];

const getItemLabel = (item: string) => item;

export const ListExampleChecked = () => {
  const [checked, setChecked] = useState(items[0]);

  return (
    <Example>
      <List
        items={items}
        getItemLabel={getItemLabel}
        getItemChecked={(item) => checked === item}
        onItemClick={setChecked}
      />
    </Example>
  );
};
