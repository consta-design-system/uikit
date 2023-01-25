import { Example } from '@consta/stand';
import React from 'react';

import { List } from '##/components/ListCanary';

export const ListExampleCustomTypes = () => {
  return (
    <Example>
      <List
        items={['Первый', 'Второй', 'Третий']}
        getItemLabel={(item) => item}
      />
    </Example>
  );
};
