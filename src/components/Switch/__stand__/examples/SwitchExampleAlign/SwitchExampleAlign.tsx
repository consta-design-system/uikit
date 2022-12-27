import { Example } from '@consta/stand';
import React from 'react';

import { Switch } from '../../../Switch';

const emptyFunction = () => {};

export const SwitchExampleAlign = () => (
  <Example col={{ 1: 0, 2: 460 }}>
    <Switch
      align="center"
      checked
      label="Длинный текст переключателя с выравниванием по центру, записанный в несколько строк"
      onChange={emptyFunction}
    />
    <Switch
      align="top"
      checked
      label="Длинный текст переключателя с выравниванием по верху, записанный в несколько строк"
      onChange={emptyFunction}
    />
  </Example>
);
