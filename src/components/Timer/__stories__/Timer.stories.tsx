import React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { Timer } from '../Timer';

import mdx from './Timer.mdx';

const defaultKnobs = () => ({
  seconds: number('seconds', 5),
  progress: number('progress', 50),
  animation: boolean('animation', false),
  size: select('size', ['s', 'm'], 'm'),
});

export function Playground() {
  const { seconds, progress, animation, size } = defaultKnobs();

  return <Timer seconds={seconds} progress={progress} animation={animation} size={size} />;
}

export default {
  title: 'Components|/Timer',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
