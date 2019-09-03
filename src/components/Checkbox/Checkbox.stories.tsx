import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Checkbox from './';

const knobs = () => ({
  disabled: boolean('Disabled', false),
  intermediate: boolean('Intermediate', false),
  wpSize: select('Size', ['m', 'l'], 'm'),
});

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Чекбокс', () => <Checkbox {...knobs()}>{text('Content', 'Check me, baby!')}</Checkbox>);
