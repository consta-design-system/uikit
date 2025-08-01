import { IconAlert } from '@consta/icons/IconAlert';
import { Example } from '@consta/stand';
import React from 'react';

import { Banner } from '../../..';

export const BannerExampleIcon = () => {
  return (
    <Example col={1}>
      <Banner leftSide="Заголовок" icon={IconAlert} />
    </Example>
  );
};
