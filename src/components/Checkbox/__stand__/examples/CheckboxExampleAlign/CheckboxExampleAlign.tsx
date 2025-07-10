import { Example } from '@consta/stand';
import React from 'react';

import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleAlign = () => (
  <Example>
    <Checkbox
      style={{ maxWidth: 300 }}
      align="center"
      checked
      label="Длинный текст для чекбокса с выравниванием по центру, здесь несколько строк"
      onChange={() => console.log('onChange')}
    />
    <Checkbox
      style={{ maxWidth: 300 }}
      align="top"
      checked
      label="Длинный текст для чекбокса с выравниванием по верху, здесь несколько строк"
      onChange={() => console.log('onChange')}
    />
  </Example>
);
