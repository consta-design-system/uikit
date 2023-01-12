import { Example } from '@consta/stand';
import React from 'react';

import { Switch } from '../../../Switch';

const emptyFunction = () => {};

export const SwitchExampleStatus = () => (
  <Example>
    <Switch label="Switch" checked={false} onChange={emptyFunction} />
    <Switch label="Checked" checked onChange={emptyFunction} />
    <Switch
      label="Disabled"
      disabled
      checked={false}
      onChange={emptyFunction}
    />
  </Example>
);
