import { Example } from '@consta/stand';
import React from 'react';

import { Timer } from '../../../Timer';

export function TimerExampleSeconds() {
  return (
    <Example
      getItemNode={(item) => item}
      items={[3, 5, 7].map((seconds) => (
        <Timer size="m" seconds={seconds} progress={80} />
      ))}
    />
  );
}
