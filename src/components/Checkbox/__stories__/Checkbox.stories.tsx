import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  Checkbox,
  checkboxPropAlign,
  checkboxPropAlignDefault,
  checkboxPropSize,
  checkboxPropSizeDefault,
} from '../Checkbox';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Checkbox.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  intermediate: boolean('intermediate', false),
  size: select('size', checkboxPropSize, checkboxPropSizeDefault),
  align: select('align', checkboxPropAlign, checkboxPropAlignDefault),
  label: text('label', 'Check me, baby!'),
});

const cnCheckboxStories = cn('CheckboxStories');

export function Playground() {
  const { disabled, intermediate, size, align, label } = defaultKnobs();

  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = ({ checked }: { checked: boolean }) => setChecked(checked);

  return (
    <div className={cnCheckboxStories()}>
      <Checkbox
        disabled={disabled}
        intermediate={intermediate}
        size={size}
        label={label}
        onChange={handleChange}
        checked={checked}
        align={align}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Components|/Checkbox',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
