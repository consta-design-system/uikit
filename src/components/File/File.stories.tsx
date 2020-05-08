import * as React from 'react';
import { withKnobs, select, number, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withDocs } from '@storybook-addons/docs';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';
import { File } from './File';

function Stories(props) {
  return <File {...props} />;
}

const defaultKnobs = () => ({
  size: select('size', ['s', 'm'], 'm'),
  extension: text('extension', 'doc'),
  loading: boolean('loading', false),
  loadingWithProgressSpin: boolean('loadingWithProgressSpin', false),
  loadingProgress: number('loadingProgress', 70),
});

storiesOf('UI-KIT|/File', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: require('./File.md')['default'],
      },
    })
  )
  .add('playground', () => <Stories {...defaultKnobs()} />);

storiesOf('UI-KIT|/Examples/File', module)
  .add('_size', () => (
    <StoryBookExample>
      <File size="m" />
      <File size="s" />
    </StoryBookExample>
  ))
  .add('_extension', () => (
    <StoryBookExample>
      <File extension="doc" />
      <File extension="docx" />
      <File extension="jpg" />
      <File extension="mov" />
      <File extension="BlaBla" />
    </StoryBookExample>
  ))
  .add('_loading', () => (
    <StoryBookExample>
      <File loading loadingWithProgressSpin loadingProgress={30} />
      <File loading loadingWithProgressSpin loadingProgress={60} />
      <File loading loadingWithProgressSpin loadingProgress={90} />
      <File loading loadingWithProgressSpin />
      <File loading />
    </StoryBookExample>
  ));
