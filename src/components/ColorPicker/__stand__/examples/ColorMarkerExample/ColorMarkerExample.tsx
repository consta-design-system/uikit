import { Example } from '@consta/stand';
import React from 'react';

import { ColorMarker, hslaModel } from '../../..';

export const ColorMarkerExample = () => {
  return (
    <Example col={1}>
      <ColorMarker model={hslaModel} value={{ h: 296, s: 65, l: 40, a: 0.5 }} />
    </Example>
  );
};
