import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import {
  Switch,
  switchPropAlign,
  switchPropAlignDefault,
  switchPropSize,
  switchPropSizeDefault,
  switchPropView,
  switchPropViewDefault,
} from '../Switch';

import mdx from './Switch.docs.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', switchPropSize, switchPropSizeDefault),
  view: select('view', switchPropView, switchPropViewDefault),
  align: select('align', switchPropAlign, switchPropAlignDefault),
  label: text('label', 'Это переключатель'),
});

export function Playground() {
  const { disabled, size, view, label, align } = defaultKnobs();
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = ({ checked }: { checked: boolean }) => setChecked(checked);

  return (
    <form>
      <Switch
        checked={checked}
        disabled={disabled}
        size={size}
        view={view}
        label={label}
        align={align}
        onChange={handleChange}
      />
    </form>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/Switch',
  id: 'components/Switch',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A2269',
    },
  },
});
