import { Example } from '@consta/stand';
import React from 'react';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsDeprecated';

const emptyFunction = () => {};

export const ExampleStepsSize = () => (
  <Example col={1}>
    <Steps
      size="m"
      items={items}
      getLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
    <Steps
      size="l"
      items={items}
      getLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
  </Example>
);
