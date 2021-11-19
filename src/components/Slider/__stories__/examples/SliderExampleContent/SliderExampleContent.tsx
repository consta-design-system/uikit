import React, { useState } from 'react';

import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Slider } from '../../../Slider';

export const SliderExampleContent = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        value={value}
        range
        label={`Значение ${value[0]}-${value[1]}`}
        withTooltip
        step={5}
        view="division"
        leftSide="input"
        rightSide={IconSettings}
        onChange={({ value }) => setValue(value)}
      />
    </div>
  );
};
