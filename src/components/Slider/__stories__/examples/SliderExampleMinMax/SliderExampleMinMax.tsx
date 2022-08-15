import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../Slider';

export const SliderExampleMinMax = () => {
  const [value, setValue] = useState<number>(50);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        range={false}
        min={20}
        max={70}
      />
    </div>
  );
};
