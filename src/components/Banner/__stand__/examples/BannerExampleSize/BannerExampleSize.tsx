import { Example } from '@consta/stand';
import React from 'react';

import { Banner } from '../../..';

export const BannerExampleSize = () => {
  return (
    <Example
      col={{ 1: 0, 2: 700 }}
      items={['xs', 's', 'm', 'l'] as const}
      getItemNode={(size) => <Banner leftSide="Заголовок" size={size} />}
      getItemDescription={(size) => `size=${size}`}
    />
  );
};
