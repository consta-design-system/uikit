import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Input from '.';

const knobs = () => ({
  view: select('View', ['default'], 'default'),
  width: select('Width', ['full', 'default'], 'default'),
  wpSize: select('Size', ['xs', 's', 'm', 'l'], 'm'),
  form: select(
    'Form',
    [
      'default',
      'brick',
      'round',
      'clear-round',
      'round-clear',
      'clear-default',
      'default-clear',
      'default-brick',
      'brick-default',
      'brick-clear',
      'clear-brick',
      'clear-clear',
    ],
    'default',
  ),
  state: select('State', ['', 'alert', 'success', 'warning'], ''),
  disabled: boolean('Disabled', false),
});

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('Текстовый инпут', () => (
    <Input placeholder={text('Placeholder', 'My placeholder')} {...knobs()} />
  ));
