import { Example } from '@consta/stand';
import React from 'react';

import { ListAddItem } from '##/components/ListCanary/ListAddItem';

export const ListAddItemExample = () => {
  return (
    <Example>
      <ListAddItem label="Добавить" onClick={() => alert('onClick')} />
    </Example>
  );
};
