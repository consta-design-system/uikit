import { useBoolean, useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { DatePickerLine } from '../DatePickerLine';

const Variants = () => {
  const withClearButton = useBoolean('withClearButton', true);
  const disabled = useBoolean('disabled', false);
  const size = useSelect('size', ['s', 'm', 'l'], 'm');
  const view = useSelect('view', ['default', 'clear'], 'default');

  const [value, setValue] = useState<Date | null>(null);

  return (
    <div style={{ width: '100%' }}>
      <DatePickerLine />
    </div>
  );
};

export default Variants;
