import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';
import { SpoilerPropSize } from '##/components/SpoilerCanary/types';

const items: SpoilerPropSize[] = ['l', 'm', 's', 'xs'];

export const SpoilerExampleSize = () => {
  return (
    <Example
      col={{ 1: 0, 2: 400 }}
      items={items}
      getItemNode={(size) => <Spoiler size={size} />}
      getItemDescription={(size) => `size = ${size}`}
    />
  );
};
