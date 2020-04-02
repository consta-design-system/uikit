import React, { useState } from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Radio } from './Radio';

const knobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', ['m', 'l'], 'm'),
  label: text('label', 'I am radio'),
});

storiesOf('Radio', module)
  .addDecorator(withKnobs)
  .add('Радио кнопка', () => {
    const [checked, setChecked] = useState<boolean>(false);
    const handleChange = ({ checked }) => {
      setChecked(checked);
    };
    return <Radio onChange={handleChange} checked={checked} {...knobs()} />;
  });
