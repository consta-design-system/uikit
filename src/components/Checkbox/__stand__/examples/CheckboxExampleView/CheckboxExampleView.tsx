import { Example } from '@consta/stand';
import React from 'react';

import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleView = () => (
  <Example>
    <Checkbox
      view="primary"
      checked
      label="Акцентный чекбокс"
      onChange={() => console.log('onChange')}
    />
    <Checkbox
      view="ghost"
      checked
      label="Второстепенный чекбокс"
      onChange={() => console.log('onChange')}
    />
  </Example>
);
