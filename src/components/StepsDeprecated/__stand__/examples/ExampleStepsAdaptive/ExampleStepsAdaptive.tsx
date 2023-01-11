import { Example } from '@consta/stand';
import React from 'react';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsDeprecated';

export const ExampleStepsAdaptive = () => (
  <Example>
    <Steps
      style={{ maxWidth: 300 }}
      items={items}
      value={items[1]}
      getLabel={(item) => item}
      onChange={() => {}}
    />
  </Example>
);
