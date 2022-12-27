import { Example } from '@consta/stand';
import React from 'react';

import { Radio } from '../../../Radio';

const emptyFunction = () => {};

export const RadioExampleStatus = () => (
  <Example>
    <Radio label="Radio" onChange={emptyFunction} checked={undefined} />
    <Radio label="Checked" onChange={emptyFunction} checked />
    <Radio
      label="Disabled"
      onChange={emptyFunction}
      checked={undefined}
      disabled
    />
    <Radio label="Checked Disabled" onChange={emptyFunction} checked disabled />
  </Example>
);
