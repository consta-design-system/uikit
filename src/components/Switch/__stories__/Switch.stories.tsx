import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { Switch } from '../Switch';

import mdx from './Switch.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', ['m', 'l'], 'm'),
  label: text('label', 'Move me, I beg you!'),
});

export function Playground() {
  const { disabled, size, label } = defaultKnobs();
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = ({ checked }) => {
    console.log(checked);
    setChecked(checked);
  };

  return (
    <form>
      <Switch
        checked={checked}
        disabled={disabled}
        size={size}
        label={`${label}`}
        onChange={handleChange}
      />
    </form>
  );
}

export default {
  title: 'Components|/Switch',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
