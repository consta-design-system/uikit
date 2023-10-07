import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

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

  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <Radio
      checked={checked}
      disabled={disabled}
      size={size}
      view={view}
      label={label}
      align={align}
      onChange={setChecked}
    />
  );
};

export default Variants;
