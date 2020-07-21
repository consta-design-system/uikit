import * as React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { ProgressSpin } from '../ProgressSpin';

import mdx from './ProgressSpin.mdx';

const defaultKnobs = () => ({
  progress: number('progress', 50),
  size: select('size', ['s', 'm'], 'm'),
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

export default {
  title: 'UI-KIT|/ProgressSpin',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
