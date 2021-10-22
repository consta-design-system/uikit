import React from 'react';
import { number } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { Slider } from '../Slider';

const defaultKnobs = () => ({
  value: number('value', 50),
  min: number('min', -20),
  max: number('max', 80),
});

export function Playground() {
  const { value, min, max } = defaultKnobs();

  return <Slider value={value} min={min} max={max} step={10} view="division" />;
}

export default createMetadata({
  title: 'Компоненты|/Базовые/Slider',
  id: 'components/Slider',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=5164%3A84922',
    },
  },
});
