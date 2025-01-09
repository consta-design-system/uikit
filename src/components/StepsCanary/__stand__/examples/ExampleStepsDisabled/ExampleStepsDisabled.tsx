import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsCanary';

export const ExampleStepsDisabled = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example col={1}>
      <Steps items={items} value={value} onChange={setValue} />
    </Example>
  );
};
