import { Example } from '@consta/stand';
import React from 'react';

import { Switch } from '../../../Switch';

const emptyFunction = () => {};

export const SwitchExampleSize = () => (
  <Example>
    <Switch size="xs" label="Размер XS" checked onChange={emptyFunction} />
    <Switch size="s" label="Размер S" checked onChange={emptyFunction} />
    <Switch
      size="m"
      label="Размер М"
      checked={false}
      onChange={emptyFunction}
    />
    <Switch
      size="l"
      label="Размер L"
      checked={false}
      onChange={emptyFunction}
    />
  </Example>
);
