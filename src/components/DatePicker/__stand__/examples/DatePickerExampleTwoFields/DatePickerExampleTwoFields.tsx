import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { IconBackward } from '../../../../../icons/IconBackward/IconBackward';
import { IconForward } from '../../../../../icons/IconForward/IconForward';
import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleTwoIcons = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);

  return (
    <Example col={1}>
      <DatePicker
        type="date-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        leftSide={[IconForward, IconBackward]}
        rightSide={['туда', 'обратно']}
      />
    </Example>
  );
};
