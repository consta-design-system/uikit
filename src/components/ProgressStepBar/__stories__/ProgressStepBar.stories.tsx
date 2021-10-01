import React from 'react';
import { select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { propSize, propSizeDefault } from '../helpers';
import { ProgressStepBar } from '../ProgressStepBar';

const cnProgressStepBarStories = cn('ProgressStepBarStories');

const defaultKnobs = () => ({
  size: select('size', propSize, propSizeDefault),
});

export function Playground() {
  const { size } = defaultKnobs();

  const example = [
    {
      label: 'Первый пункт',
      point: 1,
      status: 'system',
      progress: 50,
      tooltipContent: `Небольшое описание
            выполнения или состояния
            текущего этапа`,
    },
  ];

  return (
    <ProgressStepBar
      className={cnProgressStepBarStories()}
      direction="horizontal"
      size={size}
      steps={example}
      getItemKey={(el) => el.toString()}
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
