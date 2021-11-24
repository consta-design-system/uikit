import React from 'react';

import { ProgressStepBar } from '../../../ProgressStepBarCanary';

const steps = [
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

export const ProgressStepBarExampleDirectionHorizontal = () => {
  return <ProgressStepBar size="s" direction="horizontal" steps={steps} activeStepIndex={2} />;
};

export const ProgressStepBarExampleDirectionVerical = () => {
  return <ProgressStepBar size="s" direction="vertical" steps={steps} activeStepIndex={2} />;
};
