import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { useFlag } from '##/hooks/useFlag';

import {
  Checkbox,
  checkboxPropAlign,
  checkboxPropAlignDefault,
  checkboxPropSize,
  checkboxPropSizeDefault,
  checkboxPropView,
  checkboxPropViewDefault,
} from '../Checkbox';

const Variants = () => {
  const disabled = useBoolean('disabled', false);
  const intermediate = useBoolean('intermediate', false);
  const size = useSelect('size', checkboxPropSize, checkboxPropSizeDefault);
  const view = useSelect('view', checkboxPropView, checkboxPropViewDefault);
  const align = useSelect('align', checkboxPropAlign, checkboxPropAlignDefault);
  const label = useText('label', 'Отметьте меня');

  const [checked, setChecked] = useFlag();

  return (
    <Checkbox
      disabled={disabled}
      intermediate={intermediate}
      size={size}
      view={view}
      label={label}
      onChange={setChecked.toggle}
      checked={checked}
      align={align}
    />
  );
};

export default Variants;
