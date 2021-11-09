import React, { useCallback, useState } from 'react';

import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { TextFieldOnChangeArguments } from '../../../../TextField/helpers';
import { TextField } from '../../../../TextField/TextField';
import { Slider } from '../../../Slider';

export const SliderExampleContent = () => {
  const [value, setValue] = useState<[number, number]>([20, 50]);

  const onChange = useCallback(
    (e: TextFieldOnChangeArguments) => {
      const newVal = Number(e.value);
      setValue([newVal, value[1]]);
    },
    [value],
  );

  const right = ({ value }: { value: number | number[] }) => (
    <TextField
      min={0}
      max={100}
      type="number"
      onChange={onChange}
      step={5}
      value={(Array.isArray(value) ? value[1] : value).toString()}
    />
  );

  const left = <IconSettings view="secondary" />;

  return (
    <div className={cnDocsDecorator('Section')}>
      <Slider
        value={value}
        range
        label={`Значение ${value[0]}-${value[1]}`}
        withTooltip
        step={5}
        width="full"
        view="division"
        leftSide={left}
        rightSide={right}
        onChange={({ value }) => setValue(value)}
      />
    </div>
  );
};
