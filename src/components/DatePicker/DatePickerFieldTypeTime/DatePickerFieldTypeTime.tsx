import React from 'react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { TextField } from '../../TextField/TextField';
import {
  datePickerPropFormatTypeTime,
  datePickerPropPlaceholderTypeTime,
  datePickerPropSeparatorDefault,
} from '../helpers';
import { DatePickerFieldTypeTimeProps, usePicker } from './helpers';

export const DatePickerFieldTypeTime = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeTimeProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeTime,
    separator = datePickerPropSeparatorDefault,
    placeholder = datePickerPropPlaceholderTypeTime,
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

  const { stringValue, inputRef } = usePicker({
    value,
    onChange,
    onError,
    separator,
    format,
    minDate,
    maxDate,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
  });

  return (
    <TextField
      {...otherProps}
      type="text"
      onChange={({ e, value }) =>
        value === null && onChange?.({ e: e.nativeEvent, value })
      }
      inputContainerRef={ref}
      inputRef={useForkRef([inputRef, inputRefProp])}
      value={stringValue}
      placeholder={placeholder}
    />
  );
});
