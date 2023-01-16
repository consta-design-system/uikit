import './ListGroupLabelExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { ListGroupLabel } from '##/components/ListCanary/ListGroupLabel';
import { cn } from '##/utils/bem';

const cnListGroupLabelExample = cn('ListGroupLabelExample');

export const ListGroupLabelExample = () => {
  return (
    <Example>
      <ListGroupLabel
        className={cnListGroupLabelExample()}
        label="Заголовок"
        rightSide={<Badge label="Example" />}
      />
    </Example>
  );
};
