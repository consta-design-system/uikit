import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import {
  Radio,
  radioPropAlign,
  radioPropAlignDefault,
  radioPropSize,
  radioPropSizeDefault,
  radioPropView,
  radioPropViewDefault,
} from '../Radio';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Radio.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', radioPropSize, radioPropSizeDefault),
  view: select('view', radioPropView, radioPropViewDefault),
  align: select('align', radioPropAlign, radioPropAlignDefault),
  label: text('label', 'I am radio'),
  checked: boolean('checked', false),
});

export function Playground() {
  const { disabled, size, view, label, align, checked } = defaultKnobs();

  return (
    <form>
      <Radio
        checked={checked}
        disabled={disabled}
        size={size}
        view={view}
        label={label}
        align={align}
        onChange={action('onChange')}
      />
    </form>
  );
}

export default createMetadata({
  title: 'Компоненты|/Radio',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
