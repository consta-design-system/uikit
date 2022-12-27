import { Example } from '@consta/stand';
import React from 'react';

import { IconPropSize } from '../../../../Icon';
import { IconBag } from '../../../../IconBag/IconBag';

const sizes: IconPropSize[] = ['xs', 's', 'm', 'l'];

export const IconExampleSize = () => (
  <Example
    col={{ 1: 0, 2: 240, 4: 420 }}
    items={sizes}
    separately
    getItemNode={(size) => <IconBag size={size} />}
    getItemDescription={(size) => `size="${size}"`}
  />
);
