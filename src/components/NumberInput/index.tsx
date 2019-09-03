import React from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import '../Input/styles.css';
import Input, { InputProps } from '../Input';

export type NumberInputProps = Omit<InputProps, 'value' | 'defaultValue' | 'type'> & {
  value?: number;
  onValueChange?: (value: number) => void;
  allowNegative?: boolean;
  max?: number;
  min?: number;
};

const NumberInput: React.FC<NumberInputProps> = ({
  onValueChange,
  value,
  min,
  max,
  wpSize,
  ...props
}) => {
  const isAllowed = (valueObj: NumberFormatValues) => {
    const { floatValue, value } = valueObj;
    const floatValueIsUndefined = typeof floatValue === 'undefined';
    const minCorrect =
      typeof min !== 'undefined' && !floatValueIsUndefined ? floatValue >= min : true;
    const maxCorrect =
      typeof max !== 'undefined' && !floatValueIsUndefined ? floatValue <= max : true;
    const minusCorrect =
      typeof min === 'undefined' ||
      min < 0 ||
      (typeof max === 'undefined' || max < 0) ||
      !value.includes('-');
    return !value || (minusCorrect && minCorrect && maxCorrect);
  };

  return (
    <NumberFormat
      {...props}
      value={value}
      onValueChange={parsed => onValueChange && onValueChange(parsed.floatValue)}
      thousandSeparator=" "
      decimalSeparator="."
      isAllowed={isAllowed}
      customInput={Input}
      wpSize={wpSize}
    />
  );
};

export default NumberInput;
