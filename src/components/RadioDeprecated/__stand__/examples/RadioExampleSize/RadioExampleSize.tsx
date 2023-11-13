import { Example } from '@consta/stand';
import React from 'react';

import { Radio, RadioPropSize } from '../../../RadioDeprecated';

const items: RadioPropSize[] = ['l', 'm', 's', 'xs'];

export const RadioExampleSize = () => (
  <Example
    items={items}
    getItemNode={(size) => <Radio size={size} label={`Размер ${size}`} />}
  />
);
