import { Example } from '@consta/stand';
import React from 'react';

import { Radio, RadioPropSize } from '../../../Radio';

const items: RadioPropSize[] = ['l', 'm', 's', 'xs'];

export const RadioExampleSize = () => (
  <Example
    items={items}
    getItemNode={(size) => <Radio size={size} label={`Размер ${size}`} />}
  />
);
