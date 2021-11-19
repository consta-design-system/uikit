import React, { useEffect, useState } from 'react';

import { TextFieldOnChangeArguments, TextFieldProps } from '../../TextField/helpers';
import { TextField } from '../../TextField/TextField';

type Props = Omit<TextFieldProps<'number'>, 'value' | 'onChange'> & {
  value: number;
  onChange?: (props: { e?: React.ChangeEvent; value: number }) => void;
};

export const SliderInput = (props: Props) => {
  const { value, onChange, ...otherProps } = props;

  const [currentValue, setCurrentValue] = useState<string | null>(value.toString());

  useEffect(() => {
    setCurrentValue(value.toString());
  }, [value]);

  const handleChange = (e: TextFieldOnChangeArguments) => {
    setCurrentValue(e.value);
  };

  const commitChange = () => {
    if (currentValue) {
      onChange?.({ value: Number(currentValue) });
    }
  };

  return (
    <TextField
      onBlur={commitChange}
      type="number"
      onChange={handleChange}
      value={currentValue}
      {...otherProps}
    />
  );
};
