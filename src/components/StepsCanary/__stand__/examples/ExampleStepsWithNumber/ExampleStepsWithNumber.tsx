import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../StepsCanary';

const getItemLabel = <T,>(item: T) => item;

export const ExampleStepsWithNumber = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example col={1}>
      <Steps
        items={items}
        value={value}
        getItemLabel={getItemLabel}
        onChange={setValue}
        withNumber
      />
    </Example>
  );
};
