import { Example } from '@consta/stand';
import React from 'react';

import { Timer } from '../../../Timer';

export function TimerExampleSize() {
  return (
    <Example
      getItemNode={(item) => item}
      items={(['s', 'm', 'l', 'xl', '2xl'] as const).map((size) => (
        <Timer size={size} seconds={5} progress={80} />
      ))}
    />
  );
}
