import * as React from 'react';
import { withDocs } from '@storybook-addons/docs';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { presetGpnDefault, Theme } from '../Theme';
import md from '../Theme.md';

import { RootTheme } from './examples/RootTheme';

storiesOf('UI-KIT|/Theme', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: md,
      },
    }),
  )
  .add('documentation', () => {
    return <Theme preset={presetGpnDefault} />;
  });

storiesOf('UI-KIT|/Examples/Theme', module).add('_example', () => <RootTheme />);
