import { Example } from '@consta/stand';
import React from 'react';

import { Steps } from '../../../StepsCanary';

const steps = [
  'Первый шаг',
  'Второй шаг',
  'Третий шаг',
  'Четвертый шаг',
  'Пятый шаг',
];

const getItemLabel = <T,>(item: T) => item;

export const ExampleStepsAdaptive = () => (
  <Example col={1}>
    <div style={{ maxWidth: 300 }}>
      <Steps
        items={steps}
        value={steps[0]}
        getItemLabel={getItemLabel}
        withNumber
        fitMode="scroll"
      />
    </div>
    <div style={{ maxWidth: 300 }}>
      <Steps
        items={steps}
        value={steps[0]}
        getItemLabel={getItemLabel}
        withNumber
        fitMode="scrollWithButtons"
      />
    </div>
  </Example>
);
