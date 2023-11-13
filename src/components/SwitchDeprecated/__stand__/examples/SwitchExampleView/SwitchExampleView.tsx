import { Example } from '@consta/stand';
import React from 'react';

import { Switch } from '../../../SwitchDeprecated';

const emptyFunction = () => {};

export const SwitchExampleView = () => (
  <Example>
    <Switch
      view="primary"
      checked
      label="Акцентный переключатель"
      onChange={emptyFunction}
    />
    <Switch
      view="ghost"
      checked
      label="Второстепенный переключатель"
      onChange={emptyFunction}
    />
  </Example>
);
