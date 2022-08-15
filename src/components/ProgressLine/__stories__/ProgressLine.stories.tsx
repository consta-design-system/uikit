import { number, select } from '@storybook/addon-knobs';
import React from 'react';

import { createMetadata } from '../../../utils/storybook';
import { ProgressLine } from '../ProgressLine';
import { defaultProgressLinePropSize, progressLinePropSize } from '../types';
import mdx from './ProgressLine.docs.mdx';

const defaultKnobs = () => ({
  mode: select(
    'mode',
    ['determinate', 'indeterminate', 'steps'],
    'determinate',
  ),
  size: select('size', progressLinePropSize, defaultProgressLinePropSize),
  steps: number('steps', 6),
  value: number('progresvalues', 50),
});

export const Playground = () => {
  const { mode, size, value, steps } = defaultKnobs();

  return (
    <ProgressLine
      size={size}
      value={mode !== 'indeterminate' ? value : undefined}
      steps={
        mode === 'steps'
          ? Array.from({ length: steps }, (_, i) => i + 1)
          : undefined
      }
      getItemLabel={(item) => item?.toString()}
    />
  );
};

export default createMetadata({
  title: 'Компоненты|/Обратная связь/ProgressLine',
  id: 'components/ProgressLine',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=87813%3A160639',
    },
  },
});
