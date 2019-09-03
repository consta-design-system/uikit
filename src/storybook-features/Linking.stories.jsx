import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

storiesOf('storybook-features/Linking', module)
  .add('First', () => (
    <button onClick={linkTo('storybook-features/Linking', 'Second')}>
      Go to &quot;Second&quot;
    </button>
  ))
  .add('Second', () => (
    <button onClick={linkTo('storybook-features/Linking', 'First')}>Go to &quot;First&quot;</button>
  ));
