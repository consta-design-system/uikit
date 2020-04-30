import React from 'react';
import { withKnobs, select, number, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withDocs } from '@storybook-addons/docs';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';
import { File } from './File';

function Stories(props) {
  return <File {...props} />;
}

const defaultKnobs = () => ({
  extension: text('extension', 'doc'),
  loadingProgress: number('loadingProgress', 70),
  loading: boolean('loading', false),
  size: select('size', ['s', 'm'], 'm'),
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
      <File loading loadingProgress={30} />
      <File loading loadingProgress={60} />
      <File loading loadingProgress={90} />
      <File loading />
    </StoryBookExample>
  ));
