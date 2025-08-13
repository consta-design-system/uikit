import { Example } from '@consta/stand';
import React from 'react';

import { Banner } from '../../..';

export const BannerExampleForm = () => {
  return (
    <Example
      col={{ 1: 0, 2: 700 }}
      items={['default', 'round', 'brick'] as const}
      getItemNode={(form) => <Banner leftSide="Заголовок" form={form} />}
      getItemDescription={(form) => `form=${form}`}
    />
  );
};
