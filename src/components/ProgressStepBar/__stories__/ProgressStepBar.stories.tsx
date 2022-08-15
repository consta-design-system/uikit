import { select } from '@storybook/addon-knobs';
import React from 'react';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { IconClose } from '../../../icons/IconClose/IconClose';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  propDirection,
  propDirectionDefault,
  propSize,
  propSizeDefault,
} from '../helpers';
import { ProgressStepBar } from '../ProgressStepBar';
import mdx from './ProgressStepBar.docs.mdx';

const cnProgressStepBarStories = cn('ProgressStepBarStories');

const stepsExample = [
  {
    label: 'Первый пункт',
    point: IconCheck,
    status: 'success',
    lineStatus: 'success',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Второй пункт',
    point: IconClose,
    status: 'alert',
    lineStatus: 'alert',
    tooltipContent: `Небольшое описание выполнения или состояния текущего этапа`,
  },
  {
    label: 'Третий пункт',
    point: 3,
    progress: true,
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
  activeStepIndex: select('activeStepIndex', ['', 0, 1, 2, 3], 3),
});

export const Playground = () => {
  const { size, direction, activeStepIndex } = defaultKnobs();

  return (
    <ProgressStepBar
      className={cnProgressStepBarStories()}
      direction={direction}
      size={size}
      steps={stepsExample}
      activeStepIndex={
        typeof activeStepIndex === 'number' ? activeStepIndex : undefined
      }
    />
  );
};

export default createMetadata({
  title: 'Компоненты|/Отображение данных/ProgressStepBar(Canary)',
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
