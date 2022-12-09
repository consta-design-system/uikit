import { Example } from '@consta/stand';
import React from 'react';

import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleStatus = () => (
  <Example>
    <Checkbox
      label="Checkbox"
      onChange={() => console.log('onChange')}
      checked={false}
    />
    <Checkbox
      checked
      label="Checked"
      onChange={() => console.log('onChange')}
    />
    <Checkbox
      intermediate
      label="Intermediate"
      onChange={() => console.log('onChange')}
      checked={false}
    />
    <Checkbox
      disabled
      label="Disabled"
      onChange={() => console.log('onChange')}
      checked={false}
    />
    <Checkbox
      disabled
      checked
      label="Disabled Checked"
      onChange={() => console.log('onChange')}
    />
  </Example>
);
