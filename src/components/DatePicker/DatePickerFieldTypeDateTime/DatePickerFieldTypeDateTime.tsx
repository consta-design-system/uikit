import React from 'react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { TextField } from '../../TextField/TextField';
import {
  datePickerPropFormatTypeDateTime,
  datePickerPropPlaceholderTypeDateTime,
  datePickerPropSeparatorDefault,
} from '../helpers';
import { DatePickerFieldTypeDateTimeProps, usePicker } from './helpers';

export const DatePickerFieldTypeDateTime = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeDateTimeProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeDateTime,
    separator = datePickerPropSeparatorDefault,
    placeholder = datePickerPropPlaceholderTypeDateTime,
    onChange,
    onError,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    value,
    inputRef: inputRefProp,
    multiplicityHours,
    multiplicitySeconds,
    multiplicityMinutes,
    ...otherProps
  } = props;

  const { stringValue, inputRef, clearValue } = usePicker({
    onChange,
    value,
    onError,
    maxDate,
    minDate,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
    separator,
    format,
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
