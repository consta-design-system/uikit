import { Example } from '@consta/stand';
import React from 'react';

import { items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../Steps';

const emptyFunction = () => {};

export const ExampleStepsSkipped = () => (
  <Example col={1}>
    <Steps
      items={items}
      getItemSkipped={(item) => item.skip}
      value={items[1]}
      onChange={emptyFunction}
    />
  </Example>
);
