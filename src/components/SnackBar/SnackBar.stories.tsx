import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { SnackBar } from './SnackBar';

const knobs = () => ({
  checked: boolean('checked', false),
  disabled: boolean('disabled', false),
  size: select('size', ['m', 'l'], 'm'),
  label: text('label', 'I am radio'),
});

storiesOf('SnackBar', module)
  .addDecorator(withKnobs)
  .add('Радио кнопка', () => {
    return <SnackBar />;
  });
