import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Checkbox } from './Checkbox';

const knobs = () => ({
  disabled: boolean('disabled', false),
  intermediate: boolean('intermediate', false),
  size: select('size', ['m', 'l'], 'm'),
  label: text('label', 'Check me, baby!'),
});

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Чекбокс', () => <Checkbox {...knobs()} />);
