import { Example } from '@consta/stand';
import React from 'react';

import { items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsDeprecated';

export const ExampleStepsCompleted = () => (
  <Example col={1}>
    <Steps
      items={items}
      getLabel={(item) => item.label}
      getCompleted={(item) => item.completed || false}
      value={items[1]}
      onChange={() => {}}
    />
  </Example>
);
