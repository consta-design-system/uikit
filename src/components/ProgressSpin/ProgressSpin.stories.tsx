import * as React from 'react';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ProgressSpin } from './ProgressSpin';

function Stories({ size, progress, animation }) {
  return <ProgressSpin size={size} progress={progress} animation={animation} />;
}

const defaultKnobs = () => ({
  progress: number('progress', 50),
  size: select('size', ['s', 'm'], 'm'),
  animation: boolean('animation', false),
});

storiesOf('UI-KIT|/ProgressSpin', module)
  .addDecorator(withKnobs)
  // .addDecorator(
  //   withDocs({
  //     readme: {
  //       content: require('./Badge.md')['default'],
  //     },
  //   })
  // )
  // .addDecorator(
  //   figmaDecorator({
  //     url: 'https://www.figma.com/file/FLCwrJTceo6xB9VInayasa/UI-Kit%2FDefault?node-id=2222%3A5588',
  //   })
  // )
  .add('playground', () => <Stories {...defaultKnobs()} />);

// storiesOf('UI-KIT|/Examples/Badge', module)
//   .add('_size', () => (
//     <StoryBookExample>
//       <Badge size="s" label="Badge" />
//       <Badge size="m" label="Badge" />
//       <Badge size="l" label="Badge" />
//     </StoryBookExample>
//   ))
//   .add('_view', () => (
//     <StoryBookExample>
//       <Badge view="filled" label="Badge" />
//       <Badge view="stroked" label="Badge" />
//     </StoryBookExample>
//   ))
//   .add('_status', () => (
//     <StoryBookExample>
//       <Badge status="success" label="Badge" />
//       <Badge status="error" label="Badge" />
//       <Badge status="warning" label="Badge" />
//       <Badge status="normal" label="Badge" />
//       <Badge status="system" label="Badge" />
//     </StoryBookExample>
//   ))
//   .add('_minified', () => (
//     <StoryBookExample>
//       <Badge minified label="Badge" />
//     </StoryBookExample>
//   ))
//   .add('_icon', () => (
//     <StoryBookExample>
//       <Badge icon={IconUser} label="Badge" />
//     </StoryBookExample>
//   ))
//   .add('_as', () => (
//     <StoryBookExample>
//       <Badge<{ href: string }> as="a" href="#" label="Badge" />
//     </StoryBookExample>
//   ));
