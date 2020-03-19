import React from 'react';
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Timer from '.';

const defaultKnobs = () => ({
  wpSize: select('Size', ['s', 'm'], 'm'),
  timer: number('Timer', 10),
  isPlaying: boolean('isPlaying', true),
});

storiesOf('Timer', module)
  .addDecorator(withKnobs)
  .add('Таймер', () => (
    <Timer
      {...defaultKnobs()}
      onComplete={() => {
        console.log('done');
        return undefined;
      }}
    />
  ));
