import React from 'react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { TextField } from '../../TextField/TextField';
import {
  datePickerPropFormatTypeDate,
  datePickerPropPlaceholderTypeDate,
  datePickerPropSeparatorDefault,
} from '../helpers';
import { DatePickerFieldTypeDateProps, usePicker } from './helpers';

export const DatePickerFieldTypeDate = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeDateProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeDate,
    separator = datePickerPropSeparatorDefault,
    placeholder = datePickerPropPlaceholderTypeDate,
    onChange,
    onError,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    value,
    inputRef: inputRefProp,
    ...otherProps
  } = props;

  const { stringValue, inputRef, clearValue } = usePicker({
    format,
    separator,
    onChange,
    onError,
    value,
    minDate,
    maxDate,
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
