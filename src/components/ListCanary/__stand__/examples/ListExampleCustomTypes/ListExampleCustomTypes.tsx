import { Example } from '@consta/stand';
import React from 'react';

import { cnMixList, List } from '##/components/ListCanary';

export const ListExampleCustomTypes = () => {
  return (
    <Example>
      <List
        className={cnMixList({})}
        items={['Первый', 'Второй', 'Третий']}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
      />
    </Example>
  );
};
