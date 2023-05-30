import { Example } from '@consta/stand';
import React from 'react';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../Steps';

const emptyFunction = () => {};

export const ExampleStepsSize = () => (
  <Example col={1}>
    <Steps
      size="s"
      items={items}
      getItemLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
    <Steps
      size="m"
      items={items}
      getItemLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
    <Steps
      size="l"
      items={items}
      getItemLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
  </Example>
);
