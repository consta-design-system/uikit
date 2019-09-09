import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '.';

const knobs = () => ({
  width: select('Width', ['full', 'default'], 'default'),
  wpSize: select('Size', ['s', 'm', 'l', 'xl'], 'm'),
  view: select('View', ['clear', 'primary', 'secondary', 'ghost'], 'primary'),
  form: select(
    'Form',
    ['default', 'brick', 'round', 'brick-round', 'round-brick', 'brick-default', 'default-brick'],
    'default',
  ),
  disabled: boolean('Disabled', false),
});

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('С текстом', () => (
    <Button onClick={action('click')} {...knobs()}>
      {text('Content', 'I am button')}
    </Button>
  ));
