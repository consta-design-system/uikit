import React from 'react';
import { withDocs } from '@storybook-addons/docs';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';

import { Timer } from './Timer';
import md from './Timer.md';

function Stories({ size, seconds, progress, animation }) {
  return <Timer size={size} seconds={seconds} progress={progress} animation={animation} />;
}

const defaultKnobs = () => ({
  seconds: number('seconds', 5),
  progress: number('progress', 50),
  animation: boolean('animation', false),
  size: select('size', ['s', 'm'], 'm'),
});

storiesOf('UI-KIT|/Timer', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: md,
      },
    }),
  )
  .add('playground', () => <Stories {...defaultKnobs()} />);

storiesOf('UI-KIT|/Examples/Timer', module).add('_size', () => (
  <StoryBookExample>
    <Timer size="m" seconds={5} progress={80} />
    <Timer size="s" seconds={5} progress={80} />
  </StoryBookExample>
));
