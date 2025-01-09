import { IconCalculator } from '@consta/icons/IconCalculator';
import { IconCalendar } from '@consta/icons/IconCalendar';
import { IconFlagFilled } from '@consta/icons/IconFlagFilled';
import { IconWrench } from '@consta/icons/IconWrench';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Steps, StepsItemDefault } from '../../../StepsCanary';

export const items: StepsItemDefault[] = [
  {
    label: 'Планирование',
    icon: IconCalendar,
  },
  {
    label: 'Расчет средств',
    icon: IconCalculator,
  },
  {
    label: 'Разработка',
    icon: IconWrench,
  },
  {
    label: 'Итог',
    icon: IconFlagFilled,
  },
];

export const ExampleStepsIcon = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <Example col={1}>
      <Steps items={items} value={value} onChange={setValue} withNumber />
    </Example>
  );
};
