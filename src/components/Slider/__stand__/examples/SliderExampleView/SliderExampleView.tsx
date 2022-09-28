import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../Slider';

export const SliderExampleViewDefault = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        view="default"
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        range={false}
      />
    </div>
  );
};

export const SliderExampleViewDivision = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        view="division"
        step={10}
        range={false}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </div>
  );
};
