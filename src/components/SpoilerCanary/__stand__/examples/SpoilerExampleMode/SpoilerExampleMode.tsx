import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';

export const SpoilerExampleMode = () => {
  return (
    <Example>
      <Spoiler mode="inner" />
      <Spoiler mode="external" />
    </Example>
  );
};
