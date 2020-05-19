import * as React from 'react';
import { withDocs } from '@storybook-addons/docs';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { createTheme, presetGpnDefault } from './Theme';

storiesOf('UI-KIT|/Theme', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: require('./Theme.md')['default'],
      },
    })
  )
  .add('documentation2', () => {
    const Theme = createTheme(presetGpnDefault);

    return <Theme />;
  });
