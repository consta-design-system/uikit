import React from 'react';

import { ProgressStepBar } from '../../../ProgressStepBar';

const steps = [
  {
    label: 'Пункт 1',
    id: 1,
    point: 1,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Пункт 2',
    point: 2,
    id: 2,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Пункт 3',
    point: 3,
    id: 3,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Пункт 4',
    point: 4,
    id: 4,
    status: 'normal',
  },
];

export const ProgressStepBarExampleDirectionHorizontal = () => {
  return <ProgressStepBar size="s" direction="horizontal" steps={steps} activeStepId={2} />;
};

export const ProgressStepBarExampleDirectionVerical = () => {
  return <ProgressStepBar size="s" direction="vertical" steps={steps} activeStepId={2} />;
};
