import { Example } from '@consta/stand';
import React from 'react';

import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleName = () => (
  <Example>
    <Checkbox
      onChange={() => console.log('onChange')}
      label="Это чекбокс"
      checked={false}
    />
  </Example>
);
