import React from 'react';
import { number, select } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { ProgressLine } from '../ProgressLine';
import {
  defaultProgressLinePropMode,
  defaultProgressLinePropSize,
  progressLinePropMode,
  progressLinePropSize,
} from '../types';

import mdx from './ProgressLine.docs.mdx';

const defaultKnobs = () => ({
  mode: select('mode', progressLinePropMode, defaultProgressLinePropMode),
  size: select('size', progressLinePropSize, defaultProgressLinePropSize),
  progress: number('progress', 50),
});

export function Playground() {
  const { mode, size, progress } = defaultKnobs();

  return <ProgressLine mode={mode} size={size} progress={progress} />;
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/ProgressLine',
  id: 'components/ProgressLine',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=5164%3A84922',
    },
  },
});
