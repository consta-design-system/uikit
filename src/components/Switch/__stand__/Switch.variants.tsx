import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { Switch } from '../Switch';
import {
  switchPropAlign,
  switchPropAlignDefault,
  switchPropSize,
  switchPropSizeDefault,
  switchPropView,
  switchPropViewDefault,
} from '../types';

const Variants = () => {
  const disabled = useBoolean('disabled', false);
  const size = useSelect('size', switchPropSize, switchPropSizeDefault);
  const view = useSelect('view', switchPropView, switchPropViewDefault);
  const align = useSelect('align', switchPropAlign, switchPropAlignDefault);
  const label = useText('label', 'Это переключатель');

  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = ({ checked }: { checked: boolean }) =>
    setChecked(checked);

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
};

export default Variants;
