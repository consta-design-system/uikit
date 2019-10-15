import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Textarea from '.';

const knobs = () => ({
  view: select('View', ['default'], 'default'),
  width: select('Width', ['full', 'default'], 'full'),
  wpSize: select('Size', ['xs', 's', 'm', 'l'], 'm'),
  state: select('State', ['', 'alert', 'success', 'warning'], ''),
  disabled: boolean('Disabled', false),
});

storiesOf('Textarea', module)
  .addDecorator(withKnobs)
  .add('Текстовый инпут', () => (
    <div style={{ width: '200px' }}>
      <Textarea placeholder={text('Placeholder', 'My placeholder')} {...knobs()} />
    </div>
  ));
