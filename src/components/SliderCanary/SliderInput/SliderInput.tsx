import React, { useEffect, useState } from 'react';

import { TextFieldOnChangeArguments, TextFieldProps } from '../../TextField/helpers';
import { TextField } from '../../TextField/TextField';
import { getValidValue } from '../useSlider/helper';

type Props = Omit<TextFieldProps<'number'>, 'value' | 'onChange' | 'min' | 'max' | 'step'> & {
  value: number;
  step?: number | number[];
  min?: number;
  max?: number;
  onChange?: (props: { e?: React.ChangeEvent; value: number }) => void;
};

export const SliderInput = (props: Props) => {
  const { value, onChange, min = 0, max = 100, step = 1, ...otherProps } = props;

  const [currentValue, setCurrentValue] = useState<string | null>(value.toString());

  const handleChange = (e: TextFieldOnChangeArguments) => {
    onChange?.({ value: Number(e.value) });
    setCurrentValue(e.value);
  };

  const commitChange = () => {
    const validatedValue = getValidValue(Number(currentValue), min, max, step);
    onChange?.({ value: validatedValue });
    setCurrentValue(validatedValue.toString());
  };

  useEffect(() => setCurrentValue(value.toString()), [value]);

  return (
    <TextField
      onBlur={commitChange}
      type="number"
      min={min}
      max={max}
      step={Array.isArray(step) ? 1 : step}
      onChange={handleChange}
      value={currentValue}
      {...otherProps}
    />
  );
};
