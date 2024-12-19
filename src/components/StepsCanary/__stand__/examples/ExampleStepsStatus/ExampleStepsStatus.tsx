import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Steps, StepsItemDefault } from '../../../StepsCanary';

export const items: StepsItemDefault[] = [
  {
    label: 'Главное',
    status: 'resolved',
    icon: IconCheck,
  },
  {
    label: 'Важное',
    status: 'error',
    icon: IconClose,
  },
  {
    label: 'Необязательное',
  },
];

export const ExampleStepsStatus = () => {
  const [value, setValue] = useState(items[1]);

  return (
    <Example col={1}>
      <Steps items={items} value={value} onChange={setValue} withNumber />
    </Example>
  );
};
