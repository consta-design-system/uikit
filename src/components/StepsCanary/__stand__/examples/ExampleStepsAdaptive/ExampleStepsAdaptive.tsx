import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Steps } from '../../../StepsCanary';

const steps = [
  'Первый шаг',
  'Второй шаг',
  'Третий шаг',
  'Четвертый шаг',
  'Пятый шаг',
];

const getItemLabel = <T,>(item: T) => item;

export const ExampleStepsAdaptive = () => {
  const [value, setValue] = useState(steps[0]);
  return (
    <Example col={1}>
      <div style={{ maxWidth: 300 }}>
        <Steps
          items={steps}
          value={value}
          onChange={setValue}
          getItemLabel={getItemLabel}
          withNumber
          fitMode="scroll"
        />
      </div>
      <div style={{ maxWidth: 300 }}>
        <Steps
          items={steps}
          onChange={setValue}
          value={value}
          getItemLabel={getItemLabel}
          withNumber
          fitMode="scrollWithButtons"
        />
      </div>
    </Example>
  );
};
