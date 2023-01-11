import { Example } from '@consta/stand';
import React from 'react';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../Steps';

const emptyFunction = () => {};

export const ExampleStepsAdaptive = () => (
  <Example col={1}>
    <Steps
      style={{ maxWidth: 300 }}
      items={items}
      value={items[1]}
      getItemLabel={(item) => item}
      onChange={emptyFunction}
    />
  </Example>
);
