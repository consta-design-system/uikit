import { Example } from '@consta/stand';
import React from 'react';

import { Radio } from '../../../Radio';

const emptyFunction = () => {};

export const RadioExampleSize = () => (
  <Example>
    <Radio
      size="m"
      label="Размер m"
      onChange={emptyFunction}
      checked={undefined}
    />
    <Radio
      size="l"
      label="Размер l"
      onChange={emptyFunction}
      checked={undefined}
    />
  </Example>
);
