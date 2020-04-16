import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { File } from './File';

const defaultKnobs = () => ({
  extension: text('extension', 'png'),
  loading: boolean('loading', false),
  size: select('size', ['m', 's'], 'm'),
});

storiesOf('File', module)
  .addDecorator(withKnobs)
  .add('File', () => <File {...defaultKnobs()} />);
