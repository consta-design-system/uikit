import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Slider from '.';

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Обычный', () => {
    return <Slider min={1} max={5} />;
  })
  .add('С разделителем', () => {
    return <Slider min={1} max={5} dots />;
  })
  .add('Много делений', () => {
    return <Slider min={1} max={20} dots />;
  })
  .add('Конкретные деления', () => {
    return <Slider min={20} max={80} marks={{ 20: '', 40: '', 80: '' }} step={null} />;
  });
