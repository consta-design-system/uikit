import { Example } from '@consta/stand';
import React from 'react';

import { DragNDropField } from '##/components/DragNDropFieldCanary';

export const DragNDropFieldExampleAccept = () => (
  <Example col={1}>
    <DragNDropField
      accept={{
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/gif': ['.gif'],
      }}
    />
  </Example>
);
