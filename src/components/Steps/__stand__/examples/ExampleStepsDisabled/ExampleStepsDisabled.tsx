import { Example } from '@consta/stand';
import React from 'react';

import { items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../Steps';

const emptyFunction = () => {};

export const ExampleStepsDisabled = () => (
  <Example col={1}>
    <Steps
      items={items}
      getItemDisabled={(item) => item.disabled}
      value={items[2]}
      onChange={emptyFunction}
    />
  </Example>
);
