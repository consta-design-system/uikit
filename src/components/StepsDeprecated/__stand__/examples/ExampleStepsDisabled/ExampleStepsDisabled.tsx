import { Example } from '@consta/stand';
import React from 'react';

import { items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsDeprecated';

const emptyFunction = () => {};

export const ExampleStepsDisabled = () => (
  <Example col={1}>
    <Steps
      items={items}
      getLabel={(item) => item.label}
      getDisabled={(item) => item.disabled || false}
      value={items[2]}
      onChange={emptyFunction}
    />
  </Example>
);
