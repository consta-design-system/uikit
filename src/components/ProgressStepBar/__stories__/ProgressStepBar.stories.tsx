import React from 'react';
import { object, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { propDirection, propDirectionDefault, propSize, propSizeDefault } from '../helpers';
import { ProgressStepBar } from '../ProgressStepBar';

const cnProgressStepBarStories = cn('ProgressStepBarStories');

const stepsExample = [
  {
    label: 'Первый пункт',
    id: 1,
    point: 1,
    status: 'normal',
    lineStatus: 'normal',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Второй пункт',
    point: 2,
    id: 2,
    status: 'warning',
    progress: 50,
    lineStatus: 'warning',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Третий пункт',
    point: 3,
    id: 3,
    status: 'alert',
    progress: 50,
    lineStatus: 'alert',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Четвертый пункт',
    point: 4,
    id: 4,
    status: 'success',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
];

const defaultKnobs = () => ({
  steps: object('steps', stepsExample),
  size: select('size', propSize, propSizeDefault),
  direction: select('direction', propDirection, propDirectionDefault),
  activeStep: select('activeStep', [1, 2, 3, 4], 1),
});

export function Playground() {
  const { size, direction, activeStep, steps } = defaultKnobs();

  return (
    <ProgressStepBar
      className={cnProgressStepBarStories()}
      direction={direction}
      size={size}
      steps={steps}
      activeStepId={activeStep}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Служебные/ProgressStepBar',
  id: 'components/ProgressStepBar',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A11236',
    },
  },
});
