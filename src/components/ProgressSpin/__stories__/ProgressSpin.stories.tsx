import * as React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { ProgressSpin, progressSpinPropSize, progressSpinPropSizeDefault } from '../ProgressSpin';

import mdx from './ProgressSpin.docs.mdx';

const defaultKnobs = () => ({
  progress: number('progress', 50),
  size: select('size', progressSpinPropSize, progressSpinPropSizeDefault),
  animation: boolean('animation', false),
});

const cnProgressSpinStories = cn('ProgressSpinStories');

export function Playground() {
  const { progress, size, animation } = defaultKnobs();

  return (
    <div className={cnProgressSpinStories()}>
      <ProgressSpin size={size} progress={progress} animation={animation} />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Обратная связь/ProgressSpin',
  id: 'components/ProgressSpin',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
