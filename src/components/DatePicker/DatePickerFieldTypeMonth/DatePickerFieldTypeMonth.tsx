import React from 'react';

import { TextField } from '##/components/TextField';
import { useForkRef } from '##/hooks/useForkRef/useForkRef';
import { maxDateDefault, minDateDefault } from '##/utils/date';

import {
  datePickerPropFormatTypeMonth,
  datePickerPropSeparatorDefault,
  placeholderByFormat,
} from '../helpers';
import { DatePickerFieldTypeMonthProps, usePicker } from './helpers';

export const DatePickerFieldTypeMonth = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeMonthProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeMonth,
    separator = datePickerPropSeparatorDefault,
    placeholder,
    onChange,
    onError,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    value,
    inputRef: inputRefProp,
    defaultValue,
    ...otherProps
  } = props;

  const adaptedPlaceholder = placeholder ?? placeholderByFormat(format);

  const [inputRef, onClear] = usePicker({
    value,
    format,
    separator,
    minDate,
    maxDate,
    onChange,
    onError,
  });

  return (
    <TextField
      {...otherProps}
      type="text"
      inputContainerRef={ref}
      inputRef={useForkRef([inputRef, inputRefProp])}
      placeholder={adaptedPlaceholder}
      onClear={onClear}
    />
  );
});
