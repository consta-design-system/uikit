import React from 'react';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { withDocs } from '@storybook-addons/docs';
import { storiesOf } from '@storybook/react';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';
import { Timer } from './Timer';

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
        content: require('./Timer.md')['default'],
      },
    })
  )
  .add('playground', () => <Stories {...defaultKnobs()} />);

storiesOf('UI-KIT|/Examples/Timer', module).add('_size', () => (
  <StoryBookExample>
    <Timer size="m" seconds={5} progress={80} />
    <Timer size="s" seconds={5} progress={80} />
  </StoryBookExample>
));
