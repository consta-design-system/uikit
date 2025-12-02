import React from 'react';

import { TextField } from '##/components/TextField';
import { useForkRef } from '##/hooks/useForkRef';
import { maxDateDefault, minDateDefault } from '##/utils/date';

import {
  adaptFormat,
  datePickerPropFormatTypeTime,
  datePickerPropSeparatorDefault,
  placeholderByFormat,
} from '../helpers';
import { DatePickerFieldTypeTimeProps, usePicker } from './helpers';

export const DatePickerFieldTypeTime = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeTimeProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeTime,
    separator = datePickerPropSeparatorDefault,
    placeholder,
    onChange,
    onError,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    value,
    inputRef: inputRefProp,
    timeOptions,
    defaultValue,
    ...otherProps
  } = props;
  const adaptedFormat = adaptFormat(format, timeOptions);

  const adaptedPlaceholder = placeholder ?? placeholderByFormat(adaptedFormat);

  const [inputRef, onClear] = usePicker({
    value,
    onChange,
    onError,
    separator,
    format: adaptedFormat,
    minDate,
    maxDate,
    timeOptions,
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
