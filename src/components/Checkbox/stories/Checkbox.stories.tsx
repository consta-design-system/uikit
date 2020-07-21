import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { Checkbox } from '../Checkbox';

import mdx from './Checkbox.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  intermediate: boolean('intermediate', false),
  size: select('size', ['m', 'l'], 'm'),
  label: text('label', 'Check me, baby!'),
});

const cnCheckboxStories = cn('CheckboxStories');

export function Playground() {
  const { disabled, intermediate, size, label } = defaultKnobs();

  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className={cnCheckboxStories()}>
      <Checkbox
        disabled={disabled}
        intermediate={intermediate}
        size={size}
        label={label}
        onChange={handleChange}
        checked={checked}
      />
    </div>
  );
}

export default {
  title: 'UI-KIT|/Checkbox',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
