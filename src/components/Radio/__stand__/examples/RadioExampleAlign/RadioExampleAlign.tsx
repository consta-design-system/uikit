import { Example } from '@consta/stand';
import React from 'react';

import { Radio } from '../../../Radio';

const emptyFunction = () => {};

export const RadioExampleAlign = () => (
  <Example col={{ 1: 0, 2: 500 }}>
    <Radio
      align="center"
      checked
      label="Длинный текст для радиокнопки с выравниванием по центру, тут несколько строк"
      onChange={emptyFunction}
    />
    <Radio
      align="top"
      checked
      label="Длинный текст для радиокнопки с выравниванием по верху, тут несколько строк"
      onChange={emptyFunction}
    />
  </Example>
);
