import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import {
  Switch,
  switchPropAlign,
  switchPropAlignDefault,
  switchPropSize,
  switchPropSizeDefault,
} from '../Switch';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Switch.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', switchPropSize, switchPropSizeDefault),
  align: select('align', switchPropAlign, switchPropAlignDefault),
  label: text('label', 'Move me, I beg you!'),
});

export function Playground() {
  const { disabled, size, label, align } = defaultKnobs();
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = ({ checked }: { checked: boolean }) => setChecked(checked);

  return (
    <form>
      <Switch
        checked={checked}
        disabled={disabled}
        size={size}
        label={label}
        align={align}
        onChange={handleChange}
      />
    </form>
  );
}

export default createMetadata({
  title: 'Components|/Switch',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
