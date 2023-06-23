import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';

export const SpoilerExampleOpen = () => {
  return (
    <Example>
      <Spoiler />
      <Spoiler open />
    </Example>
  );
};
