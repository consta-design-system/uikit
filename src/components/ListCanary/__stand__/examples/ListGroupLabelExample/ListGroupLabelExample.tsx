import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { ListGroupLabel } from '##/components/ListCanary/ListGroupLabel';

export const ListGroupLabelExample = () => {
  return (
    <Example>
      <ListGroupLabel label="Заголовок" rightSide={<Badge label="Example" />} />
    </Example>
  );
};
