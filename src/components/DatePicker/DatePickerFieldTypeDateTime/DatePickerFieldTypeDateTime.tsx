import React from 'react';

import { TextField } from '##/components/TextField';
import { useForkRef } from '##/hooks/useForkRef';
import { maxDateDefault, minDateDefault } from '##/utils/date';

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
    defaultValue,
    ...otherProps
  } = props;

  const inputRef = usePicker({
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
      inputContainerRef={ref}
      inputRef={useForkRef([inputRef, inputRefProp])}
      placeholder={placeholder}
    />
  );
});
