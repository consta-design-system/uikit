import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../Slider';

export const SliderExampleBasic = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        range={false}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </div>
  );
};
