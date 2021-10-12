import React from 'react';

import { ProgressStepBar } from '../../../ProgressStepBar';

type Item = {
  label: string;
  tooltipContent?: string;
  point?: number;
  progress?: boolean;
  status?: 'normal' | 'success' | 'alert' | 'warning';
  lineStatus?: 'normal' | 'success' | 'alert' | 'warning';
};

const steps: Item[] = [
  {
    label: 'Первый пункт',
    point: 1,
    status: 'normal',
    lineStatus: 'normal',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Второй пункт',
    point: 2,
    status: 'warning',
    progress: true,
    lineStatus: 'warning',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Третий пункт',
    point: 3,
    status: 'alert',
    progress: true,
    lineStatus: 'alert',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Четвертый пункт',
    point: 4,
    status: 'success',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
];
export const ProgressStepBarExampleTooltip = () => {
  return <ProgressStepBar steps={steps} />;
};
