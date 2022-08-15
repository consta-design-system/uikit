import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../Slider';

export const SliderExampleStepSingle = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        view="division"
        step={10}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        range={false}
      />
    </div>
  );
};

export const SliderExampleStepArray = () => {
  const [value, setValue] = useState<number>(20);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        view="division"
        step={[15, 40, 70]}
        label={`Значение ${value}`}
        onChange={({ value }) => setValue(value)}
        value={value}
        range={false}
      />
    </div>
  );
};
