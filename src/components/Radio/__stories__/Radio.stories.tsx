import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { Radio } from '../Radio';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Radio.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', ['m', 'l'], 'm'),
  label: text('label', 'I am radio'),
  checked: boolean('checked', false),
});

export function Playground() {
  const { disabled, size, label, checked } = defaultKnobs();

  return (
    <form>
      <Radio
        checked={checked}
        disabled={disabled}
        size={size}
        label={label}
        onChange={action('onChange')}
      />
    </form>
  );
}

export default createMetadata({
  title: 'Components|/Radio',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
