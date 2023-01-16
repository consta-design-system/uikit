import { Example } from '@consta/stand';
import React from 'react';

import { ListItem } from '##/components/ListCanary/ListItem';

export const ListItemExample = () => {
  return (
    <Example>
      <ListItem label="Пункт меню" active />
    </Example>
  );
};
