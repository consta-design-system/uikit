import React from 'react';
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

import mdx from './Radio.docs.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', radioPropSize, radioPropSizeDefault),
  view: select('view', radioPropView, radioPropViewDefault),
  align: select('align', radioPropAlign, radioPropAlignDefault),
  label: text('label', 'Это радиокнопка'),
});

export function Playground() {
  const { disabled, size, view, label, align } = defaultKnobs();

  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = ({ checked }: { checked: boolean }): void => {
    setChecked(checked);
  };

  return (
    <form>
      <Radio
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
  title: 'Компоненты|/Базовые/Radio',
  id: 'components/Radio',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=57%3A1655',
    },
  },
});
