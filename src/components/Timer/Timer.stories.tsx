import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Timer from '.';

const defaultKnobs = () => ({
  timer: number('Timer', 100),
  isPlaying: boolean('isPlaying', false),
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
