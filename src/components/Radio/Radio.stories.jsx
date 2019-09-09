import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Radio from '.';

const knobs = () => ({
  disabled: boolean('Disabled', false),
  wpSize: select('Size', ['m', 'l'], 'm'),
});

storiesOf('Radio', module)
  .addDecorator(withKnobs)
  .add('Радио кнопка', () => <Radio {...knobs()}>{text('Content', 'I am radio')}</Radio>);
