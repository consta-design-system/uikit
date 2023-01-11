import { Example } from '@consta/stand';
import React from 'react';

import { items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsDeprecated';

const emptyFunction = () => {};

export const ExampleStepsSkipped = () => (
  <Example col={1}>
    <Steps
      items={items}
      getLabel={(item) => item.label}
      getSkipped={(item) => item.skipped || false}
      value={items[1]}
      onChange={emptyFunction}
    />
  </Example>
);
