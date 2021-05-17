import React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { Timer } from '../Timer';

import mdx from './Timer.docs.mdx';

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

export default createMetadata({
  title: 'Компоненты|/Обратная связь/Timer',
  id: 'components/Timer',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=5867%3A11',
    },
  },
});
