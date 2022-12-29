import { Example } from '@consta/stand';
import React from 'react';

import { ProgressStepBar } from '../../../ProgressStepBar';

type Item = {
  label: string;
  point?: number;
  progress?: boolean;
  status?: 'normal' | 'success' | 'alert' | 'warning';
  lineStatus?: 'normal' | 'success' | 'alert' | 'warning';
};

const steps: Item[] = [
  {
    label: 'Первый шаг',
    point: 1,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Второй шаг',
    point: 2,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Третий шаг',
    point: 3,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Четвёртый шаг',
    point: 4,
    status: 'normal',
  },
];

export const ProgressStepBarExampleActive = () => {
  return (
    <Example col={1}>
      <ProgressStepBar
        direction="horizontal"
        steps={steps}
        activeStepIndex={0}
      />
      <ProgressStepBar
        direction="horizontal"
        steps={steps}
        activeStepIndex={1}
      />
      <ProgressStepBar
        direction="horizontal"
        steps={steps}
        activeStepIndex={2}
      />
      <ProgressStepBar
        direction="horizontal"
        steps={steps}
        activeStepIndex={3}
      />
    </Example>
  );
};
