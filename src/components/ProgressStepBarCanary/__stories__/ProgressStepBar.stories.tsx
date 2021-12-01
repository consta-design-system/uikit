import React from 'react';
import { select } from '@storybook/addon-knobs';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { propDirection, propDirectionDefault, propSize, propSizeDefault } from '../helpers';
import { ProgressStepBar } from '../ProgressStepBarCanary';

import mdx from './ProgressStepBar.docs.mdx';

const cnProgressStepBarStories = cn('ProgressStepBarStories');

const stepsExample = [
  {
    label: 'Первый пункт',
    point: 1,
    status: 'success',
    lineStatus: 'success',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Второй пункт',
    point: 2,
    status: 'alert',
    progress: true,
    lineStatus: 'alert',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Третий пункт',
    point: IconCheck,
    status: 'warning',
    lineStatus: 'warning',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Четвертый пункт',
    point: 4,
    status: 'normal',
    lineStatus: 'normal',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
];

const defaultKnobs = () => ({
  size: select('size', propSize, propSizeDefault),
  direction: select('direction', propDirection, propDirectionDefault),
  activeStepIndex: select('activeStepIndex', ['', 0, 1, 2, 3], ''),
});

export function Playground() {
  const { size, direction, activeStepIndex } = defaultKnobs();

  return (
    <ProgressStepBar
      className={cnProgressStepBarStories()}
      direction={direction}
      size={size}
      steps={stepsExample}
      activeStepIndex={typeof activeStepIndex === 'number' ? activeStepIndex : undefined}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Служебные/ProgressStepBar(Canary)',
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
