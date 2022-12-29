import { Example } from '@consta/stand';
import React from 'react';

import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleSize = () => (
  <Example>
    <Checkbox
      onChange={() => console.log('onChange')}
      size="xs"
      label="Размер xs"
      checked={false}
    />
    <Checkbox
      onChange={() => console.log('onChange')}
      size="s"
      label="Размер s"
      checked={false}
    />
    <Checkbox
      onChange={() => console.log('onChange')}
      size="m"
      label="Размер m"
      checked={false}
    />
    <Checkbox
      onChange={() => console.log('onChange')}
      size="l"
      label="Размер l"
      checked={false}
    />
  </Example>
);
