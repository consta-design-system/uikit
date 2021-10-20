import React from 'react';
import { object, select } from '@storybook/addon-knobs';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { propDirection, propDirectionDefault, propSize, propSizeDefault } from '../helpers';
import { ProgressStepBar } from '../ProgressStepBar';

import mdx from './ProgressStepBar.docs.mdx';

const cnProgressStepBarStories = cn('ProgressStepBarStories');

const stepsExample = [
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
    point: IconCheck,
    status: 'alert',
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

const defaultKnobs = () => ({
  steps: object('steps', stepsExample),
  size: select('size', propSize, propSizeDefault),
  direction: select('direction', propDirection, propDirectionDefault),
  activeStep: select('activeStep', [0, 1, 2, 3], 1),
});

export function Playground() {
  const { size, direction, activeStep, steps } = defaultKnobs();

  return (
    <ProgressStepBar
      className={cnProgressStepBarStories()}
      direction={direction}
      size={size}
      steps={steps}
      activeStepIndex={activeStep}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Служебные/ProgressStepBar',
  id: 'components/ProgressStepBar',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=55787%3A112460',
    },
  },
});
