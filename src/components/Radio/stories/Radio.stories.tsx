import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { Radio } from '../Radio';

import mdx from './Radio.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', ['m', 'l'], 'm'),
  label: text('label', 'I am radio'),
});

const cnRadioStories = cn('RadioStories');

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

export function Playground() {
  const { disabled, size, label } = defaultKnobs();

  return (
    <form className={cnRadioStories()}>
      <Radio
        checked={false}
        disabled={disabled}
        size={size}
        label={`${label} (1)`}
        onChange={emptyFunction}
      />
    </form>
  );
}

export default {
  title: 'UI-KIT|/Radio',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
