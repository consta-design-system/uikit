import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../SliderCanary';

export const SliderExampleDisabled = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        disabled
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        range={false}
      />
    </div>
  );
};
