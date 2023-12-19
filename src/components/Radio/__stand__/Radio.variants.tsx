import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { useFlag } from '##/hooks/useFlag';

import {
  Radio,
  radioPropAlign,
  radioPropAlignDefault,
  radioPropSize,
  radioPropSizeDefault,
  radioPropView,
  radioPropViewDefault,
} from '../Radio';

const Variants = () => {
  const disabled = useBoolean('disabled', false);
  const size = useSelect('size', radioPropSize, radioPropSizeDefault);
  const view = useSelect('view', radioPropView, radioPropViewDefault);
  const align = useSelect('align', radioPropAlign, radioPropAlignDefault);
  const label = useText('label', 'Это радиокнопка');

  const [checked, setChecked] = useFlag();

  return (
    <Radio
      checked={checked}
      disabled={disabled}
      size={size}
      view={view}
      label={label}
      align={align}
      onChange={setChecked.toggle}
    />
  );
};

export default Variants;
