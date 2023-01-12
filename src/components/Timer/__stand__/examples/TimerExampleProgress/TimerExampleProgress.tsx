import { Example } from '@consta/stand';
import React from 'react';

import { Timer } from '../../../Timer';

export function TimerExampleProgress() {
  return (
    <Example
      getItemNode={(item) => item}
      items={[undefined, 20, 40, 60, 80].map((progress) => (
        <Timer size="m" seconds={5} progress={progress} />
      ))}
    />
  );
}
