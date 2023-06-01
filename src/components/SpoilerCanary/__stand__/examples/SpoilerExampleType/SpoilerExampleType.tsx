import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';

export const SpoilerExampleType = () => {
  return (
    <Example>
      <Spoiler type="more" />
      <Spoiler type="less" />
    </Example>
  );
};
