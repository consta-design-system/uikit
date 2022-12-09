import { Example } from '@consta/stand';
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
    label: 'Первый шаг',
    point: 1,
    status: 'normal',
    lineStatus: 'normal',
    tooltipContent: `Небольшое описание выполнения или состояния на шаге 1`,
  },
  {
    label: 'Второй шаг',
    point: 2,
    status: 'warning',
    progress: true,
    lineStatus: 'warning',
    tooltipContent: `Небольшое описание выполнения или состояния на шаге 2`,
  },
  {
    label: 'Третий шаг',
    point: 3,
    status: 'alert',
    progress: true,
    lineStatus: 'alert',
    tooltipContent: `Небольшое описание выполнения или состояния на шаге 3`,
  },
  {
    label: 'Четвертый шаг',
    point: 4,
    status: 'success',
    tooltipContent: `Небольшое описание выполнения или состояния на шаге 4`,
  },
];
export const ProgressStepBarExampleTooltip = () => {
  return (
    <Example col={1}>
      <ProgressStepBar steps={steps} />
    </Example>
  );
};
