import './SliderInput.css';

import React, { useEffect, useState } from 'react';

import { cn } from '##/utils/bem';

import {
  TextField,
  TextFieldOnChangeArguments,
  TextFieldProps,
} from '../../TextField/TextField';
import { getValidValue, isValidValue } from '../useSlider/helper';

type Props = Omit<
  TextFieldProps<'number'>,
  'value' | 'onChange' | 'min' | 'max' | 'step'
> & {
  value?: number;
  step?: number | number[];
  min?: number;
  max?: number;
  onChange?: (props: {
    e?: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
    value: number;
  }) => void;
};

const cnSliderInput = cn('SliderInput');

export const SliderInput = (props: Props) => {
  const {
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    size = 'm',
    className,
    ...otherProps
  } = props;

  const [currentValue, setCurrentValue] = useState<string | null>(
    value?.toString() || null,
  );

  const handleChange = ({ e, value }: TextFieldOnChangeArguments) => {
    setCurrentValue(value);
    if (isValidValue(Number(value), min, max, step)) {
      onChange?.({ value: Number(value), e });
    }
  };

  const commitChange = () => {
    const validatedValue = getValidValue(Number(currentValue), min, max, step);
    onChange?.({ value: validatedValue });
    setCurrentValue(validatedValue.toString());
  };

  useEffect(() => setCurrentValue(value?.toString() || null), [value]);

  return (
    <TextField
      onBlur={commitChange}
      type="number"
      min={min}
      max={max}
      step={step}
      size={size}
      className={cnSliderInput({ size }, [className])}
      onChange={handleChange}
      value={currentValue}
      {...otherProps}
    />
  );
};
