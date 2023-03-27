import React from 'react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { TextField } from '../../TextField/TextField';
import {
  datePickerPropFormatTypeMonth,
  datePickerPropPlaceholderTypeMonth,
  datePickerPropSeparatorDefault,
} from '../helpers';
import { DatePickerFieldTypeMonthProps, usePicker } from './helpers';

export const DatePickerFieldTypeMonth = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeMonthProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeMonth,
    separator = datePickerPropSeparatorDefault,
    placeholder = datePickerPropPlaceholderTypeMonth,
    onChange,
    onError,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    value,
    inputRef: inputRefProp,
    ...otherProps
  } = props;

  const { stringValue, inputRef, clearValue } = usePicker({
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
      onChange={({ e, value }) => value === null && clearValue(e.nativeEvent)}
      inputContainerRef={ref}
      inputRef={useForkRef([inputRef, inputRefProp])}
      value={stringValue}
      placeholder={placeholder}
    />
  );
});
