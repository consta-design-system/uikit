import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../Slider';

export const SliderExampleWidth = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        width="full"
        label={`Значение ${value}`}
        range={false}
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </div>
  );
};
