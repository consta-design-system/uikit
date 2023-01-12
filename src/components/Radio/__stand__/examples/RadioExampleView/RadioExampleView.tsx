import { Example } from '@consta/stand';
import React from 'react';

import { Radio } from '../../../Radio';

const emptyFunction = () => {};

export const RadioExampleView = () => (
  <Example>
    <Radio
      view="primary"
      checked
      label="Акцентная радиокнопка"
      onChange={emptyFunction}
    />
    <Radio
      view="ghost"
      checked
      label="Второстепенная радиокнопка"
      onChange={emptyFunction}
    />
  </Example>
);
